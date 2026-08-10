#!/usr/bin/env node
//
// Snapshots every grant, cohort, and builder stream BuidlGuidl ever funded into
// `data/grants/`, which the /grants pages read at build time.
//
// This is deliberately a one-way capture. The ponder indexer, the v3 app backend, and the
// grants site are all being decommissioned; once they are gone this data cannot be rebuilt.
// So the script fails loudly on anything it cannot verify rather than writing partial data.
//
//   yarn snapshot:grants
//   yarn snapshot:grants --dry-run
//   yarn snapshot:grants --only=cohorts
//   yarn snapshot:grants --print-redirects
//
// Sources:
//   - ponder indexer   cohorts, builders, withdrawals (with the builders' work logs)
//   - v3 app backend   legacy cohort contracts, ENS fallbacks, app stream withdrawals
//   - grants site      the grant program, scraped from its server-rendered pages
//
import { COHORT_REGISTRY, findCohortEntry } from "./cohortRegistry.mjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const PONDER_URL = "https://bg-ponder-indexer-production.up.railway.app/graphql";
const V3_API = "https://buidlguidl-v3.ew.r.appspot.com";
const GRANTS_SITE = "https://grants.buidlguidl.com";
const RPC = {
  1: "https://ethereum-rpc.publicnode.com",
  10: "https://optimism-rpc.publicnode.com",
};

const OUT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "data", "grants");
const PAGE_SIZE = 1000; // ponder rejects anything above this
const MAX_PAGES = 50;
const WITHDRAWALS_SIZE_WARN = 110_000; // Next warns on page data over 128kB

const args = process.argv.slice(2);
const hasFlag = name => args.includes(`--${name}`);
const flagValue = name => args.find(a => a.startsWith(`--${name}=`))?.split("=")[1];

const DRY_RUN = hasFlag("dry-run");
const ONLY = flagValue("only");
const wants = section => !ONLY || ONLY.split(",").includes(section);

// ---------------------------------------------------------------- helpers

const log = (...parts) => console.log(...parts);
const warn = (...parts) => console.warn("  ! ", ...parts);

class SnapshotError extends Error {}
const fail = message => {
  throw new SnapshotError(message);
};

const assert = (condition, message) => {
  if (!condition) fail(message);
};

const round = (value, decimals = 6) => Number(value.toFixed(decimals));
const weiToEth = wei => Number(BigInt(wei)) / 1e18;
const sum = (items, pick) => round(items.reduce((total, item) => total + pick(item), 0));
const lower = value => String(value).toLowerCase();

async function fetchJson(url, init, label) {
  const response = await fetch(url, init);
  if (!response.ok) fail(`${label}: HTTP ${response.status} ${response.statusText} from ${url}`);
  return response.json();
}

async function fetchText(url, label) {
  const response = await fetch(url, { headers: { "user-agent": "buidlguidl.com grants archive snapshot" } });
  if (!response.ok) fail(`${label}: HTTP ${response.status} ${response.statusText} from ${url}`);
  return response.text();
}

// ---------------------------------------------------------------- ponder

async function ponderQuery(query, variables = {}) {
  const body = await fetchJson(
    PONDER_URL,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query, variables }),
    },
    "ponder",
  );
  if (body.errors?.length) fail(`ponder: ${body.errors.map(e => e.message).join("; ")}`);
  return body.data;
}

/**
 * Walk a paginated ponder collection. A stable `orderBy` is required: cursors are only
 * consistent under a total order.
 */
async function ponderPaginate(field, selection, orderBy) {
  const query = `query Page($after: String) {
    ${field}(limit: ${PAGE_SIZE}, orderBy: "${orderBy}", orderDirection: "asc", after: $after) {
      totalCount
      pageInfo { hasNextPage endCursor }
      items { ${selection} }
    }
  }`;

  const items = [];
  let after = null;
  let totalCount = null;

  for (let page = 0; page < MAX_PAGES; page++) {
    const data = await ponderQuery(query, { after });
    const result = data[field];
    totalCount = result.totalCount;
    items.push(...result.items);
    if (!result.pageInfo.hasNextPage) break;
    after = result.pageInfo.endCursor;
    assert(page < MAX_PAGES - 1, `ponder: ${field} exceeded ${MAX_PAGES} pages`);
  }

  assert(items.length === totalCount, `ponder: fetched ${items.length} of ${totalCount} ${field}`);
  return items;
}

async function fetchPonder() {
  const meta = await ponderQuery(`{ _meta { status } }`);
  const status = meta._meta.status;

  const mainnetAge = Date.now() / 1000 - status.mainnet.block.timestamp;
  assert(
    mainnetAge < 7 * 24 * 3600,
    `ponder: mainnet is ${Math.round(mainnetAge / 86400)} days behind — the indexer may already be down`,
  );

  const cohorts = await ponderPaginate("cohortInformations", "address chainId name url balance", "address");
  const builders = await ponderPaginate(
    "cohortBuilders",
    "address amount cohortContractAddress timestamp ens",
    "timestamp",
  );
  const withdrawals = await ponderPaginate(
    "cohortWithdrawals",
    "id builder amount cohortContractAddress reason timestamp",
    "timestamp",
  );

  return {
    blocks: { mainnet: status.mainnet.block.number, optimism: status.optimism.block.number },
    cohorts,
    builders,
    withdrawals,
  };
}

// ---------------------------------------------------------------- v3 backend

async function fetchV3() {
  const [cohorts, builders, stats, events] = await Promise.all([
    fetchJson(`${V3_API}/cohorts/stats`, undefined, "v3 cohorts"),
    fetchJson(`${V3_API}/builders`, undefined, "v3 builders"),
    fetchJson(`${V3_API}/api/stats`, undefined, "v3 stats"),
    fetchJson(`${V3_API}/latest-events?type=stream.withdraw&limit=5000`, undefined, "v3 events"),
  ]);

  assert(Array.isArray(cohorts) && cohorts.length > 0, "v3: /cohorts/stats returned no cohorts");
  assert(Array.isArray(builders) && builders.length > 0, "v3: /builders returned nothing");
  assert(Array.isArray(events) && events.length > 0, "v3: no stream.withdraw events");
  assert(typeof stats.builderCount === "number", "v3: /api/stats missing builderCount");

  return { cohorts, builders, stats, events };
}

/** Live balance check — the one guard against an indexer that silently stopped. */
async function fetchOnchainBalance(address, chainId) {
  const body = await fetchJson(
    RPC[chainId],
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_getBalance", params: [address, "latest"] }),
    },
    `rpc ${chainId}`,
  );
  if (body.error) fail(`rpc ${chainId}: ${body.error.message}`);
  return BigInt(body.result);
}

// ---------------------------------------------------------------- grants site scraper

/**
 * The grants site is a Next.js App Router app, so the cards are already rendered into the
 * HTML as an RSC flight payload. Walking the parsed element tree survives whitespace and
 * attribute-order changes in a way that regexing raw HTML would not.
 */
function parseFlightPayload(html) {
  const chunks = [...html.matchAll(/self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)/g)].map(match =>
    JSON.parse(match[1]),
  );
  const payload = chunks.join("");

  const rows = [];
  for (const [, body] of payload.matchAll(/^[0-9a-f]+:(.*)$/gm)) {
    try {
      rows.push(JSON.parse(body));
    } catch {
      // Flight rows include non-JSON forms (module refs, text chunks); those carry no data.
    }
  }
  return rows;
}

const isElement = node => Array.isArray(node) && node.length === 4 && node[0] === "$" && node[3] !== null;

/** Every element node in the tree, depth-first. */
function* elements(node) {
  if (Array.isArray(node)) {
    if (isElement(node) && typeof node[3] === "object") yield node[3];
    for (const child of node) yield* elements(child);
  } else if (node && typeof node === "object") {
    for (const child of Object.values(node)) yield* elements(child);
  }
}

const findByClass = (props, className) => {
  for (const element of elements(props.children)) {
    if (element.className === className) return element;
  }
  return undefined;
};

const findWithProp = (props, key, predicate) => {
  for (const element of elements(props.children)) {
    if (key in element && (!predicate || predicate(element))) return element;
  }
  return undefined;
};

const collectText = node => {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) {
    if (isElement(node)) return collectText(node[3]?.children);
    return node.map(collectText).join("");
  }
  if (node && typeof node === "object") return collectText(node.children);
  return "";
};

const GRANT_CARD_CLASS = "w-72 md:w-[290px] bg-primary min-h-full rounded-2xl overflow-hidden shadow-lg";
const DATE_PATTERN = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

function parseGrantCards(html, status, url) {
  const cards = [];
  for (const row of parseFlightPayload(html)) {
    for (const element of elements(row)) {
      if (element.className === GRANT_CARD_CLASS) cards.push(element);
    }
  }
  assert(cards.length > 0, `grants site: no grant cards found at ${url} — the page layout likely changed`);

  return cards.map(card => {
    const amountNode = findByClass(card, "ml-1 font-bold");
    const titleNode = findByClass(card, "text-xl m-0 line-clamp-2");
    const descriptionNode = findByClass(card, "m-0 line-clamp-3 text-sm");
    const builderNode = findWithProp(card, "address");
    const linkNode = findWithProp(card, "href", el => String(el.className ?? "").includes("badge"));

    const amount = Number(collectText(amountNode?.children).replace(/[^\d.]/g, ""));
    const title = collectText(titleNode?.children).trim();
    const description = collectText(descriptionNode?.children).trim();
    const builder = builderNode?.address;

    assert(Number.isFinite(amount) && amount > 0, `grants site: unparsable amount on "${title}" at ${url}`);
    assert(title, `grants site: a card at ${url} has no title`);
    assert(builder, `grants site: "${title}" at ${url} has no builder address`);
    assert(description, `grants site: "${title}" at ${url} has no description`);

    // The completion date is its own text node; reading it from the card's concatenated text
    // would run it together with the neighbouring "0.08 ETH".
    const dateNode = findWithProp(
      card,
      "children",
      el => typeof el.children === "string" && DATE_PATTERN.test(el.children),
    );

    /** @type {import("../utils/grants/types").ProgramGrant} */
    const grant = { title, description, amount: round(amount), builder, status };
    if (status === "completed") {
      assert(dateNode, `grants site: completed grant "${title}" has no completion date`);
      grant.completedAt = Math.floor(new Date(`${dateNode.children} UTC`).getTime() / 1000);
      if (linkNode?.href) grant.buildLink = linkNode.href;
    }
    return grant;
  });
}

const ECOSYSTEM_CARD_CLASS = "bg-base-100 rounded-2xl min-h-[380px] max-w-[370px] flex flex-col";

function parseEcosystemGrants(html) {
  const cards = [];
  for (const row of parseFlightPayload(html)) {
    for (const element of elements(row)) {
      if (element.className === ECOSYSTEM_CARD_CLASS) cards.push(element);
    }
  }
  assert(cards.length > 0, "grants site: no ecosystem grant cards found — the home page layout likely changed");

  return cards.map(card => {
    const text = collectText(card.children);
    const nameNode = findWithProp(card, "alt");
    const amountMatch = text.match(/Amount:\s*([\d.,]+)\s*ETH/);
    const descriptionNode = findByClass(card, "text-sm m-0 font-spaceMono font-normal leading-5 pb-2");
    const xLinkNode = findWithProp(card, "href", el => String(el.href).includes("x.com"));

    const name = nameNode?.alt;
    assert(name, "grants site: an ecosystem grant card has no name");
    assert(amountMatch, `grants site: ecosystem grant "${name}" has no amount`);

    /** @type {import("../utils/grants/types").EcosystemGrant} */
    const grant = {
      name,
      description: collectText(descriptionNode?.children).trim(),
      amount: round(Number(amountMatch[1].replace(/,/g, ""))),
    };
    if (xLinkNode?.href) grant.xLink = xLinkNode.href;
    return grant;
  });
}

function parseGrantStats(html, ecosystem, completed) {
  const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
  const pick = label => {
    const match = text.match(new RegExp(`([\\d.,]+)\\s*(?:ETH)?\\s*${label}`, "i"));
    assert(match, `grants site: could not read the "${label}" stat from the home page`);
    return Number(match[1].replace(/,/g, ""));
  };

  const totalGrants = pick("Total grants");
  const totalEthGranted = pick("ETH granted");
  const activeGrants = pick("Active grants");

  // The headline ETH figure is ecosystem grants plus completed community grants. If that no
  // longer adds up, the scrape missed cards and the archive would understate what was funded.
  const reconciled = round(sum(ecosystem, g => g.amount) + sum(completed, g => g.amount), 2);
  assert(
    Math.abs(reconciled - totalEthGranted) < 0.05,
    `grants site: scraped ${reconciled} ETH but the site reports ${totalEthGranted} ETH — cards are missing`,
  );

  return { totalGrants, totalEthGranted, activeGrants };
}

async function fetchGrants() {
  const [home, completedHtml, activeHtml] = await Promise.all([
    fetchText(`${GRANTS_SITE}/`, "grants home"),
    fetchText(`${GRANTS_SITE}/completed-grants`, "completed grants"),
    fetchText(`${GRANTS_SITE}/active-grants`, "active grants"),
  ]);

  const completed = parseGrantCards(completedHtml, "completed", `${GRANTS_SITE}/completed-grants`);
  const active = parseGrantCards(activeHtml, "active", `${GRANTS_SITE}/active-grants`);
  const ecosystem = parseEcosystemGrants(home);
  const stats = parseGrantStats(home, ecosystem, completed);

  return { completed, active, ecosystem, stats };
}

// ---------------------------------------------------------------- build the snapshot

function buildEnsIndex(ponder, v3) {
  const index = new Map();
  const add = (address, ens) => {
    if (!address || !ens) return;
    const key = lower(address);
    if (!index.has(key)) index.set(key, ens);
  };

  ponder.builders.forEach(builder => add(builder.address, builder.ens));
  v3.builders.forEach(builder => add(builder.id, builder.ens));
  v3.cohorts.forEach(cohort =>
    Object.entries(cohort.builders ?? {}).forEach(([address, data]) => add(address, data.ens)),
  );
  return index;
}

function buildCohorts(ponder, v3, ensIndex) {
  // Every contract either source knows about, so a cohort dropped from the indexer still
  // gets archived rather than silently vanishing.
  const discovered = new Set([...ponder.cohorts.map(c => lower(c.address)), ...v3.cohorts.map(c => lower(c.id))]);

  const unknown = [...discovered].filter(address => !findCohortEntry(address));
  if (unknown.length) {
    const stubs = unknown
      .map(address => `  { address: "${address}", slug: "TODO", displayName: "TODO", chainId: 1 },`)
      .join("\n");
    fail(`unknown cohort contract(s). Add to scripts/cohortRegistry.mjs and re-run:\n${stubs}`);
  }

  const ponderByAddress = new Map(ponder.cohorts.map(c => [lower(c.address), c]));

  const withdrawalsBySlug = new Map();
  for (const withdrawal of ponder.withdrawals) {
    const entry = findCohortEntry(withdrawal.cohortContractAddress);
    assert(entry, `withdrawal ${withdrawal.id} belongs to unregistered ${withdrawal.cohortContractAddress}`);
    const list = withdrawalsBySlug.get(entry.slug) ?? [];
    list.push({
      tx: withdrawal.id.split("-")[0],
      builder: lower(withdrawal.builder),
      ens: ensIndex.get(lower(withdrawal.builder)),
      amount: round(withdrawal.amount),
      reason: withdrawal.reason ?? "",
      timestamp: Number(withdrawal.timestamp),
    });
    withdrawalsBySlug.set(entry.slug, list);
  }

  const buildersBySlug = new Map();
  for (const builder of ponder.builders) {
    const entry = findCohortEntry(builder.cohortContractAddress);
    assert(entry, `builder ${builder.address} belongs to unregistered ${builder.cohortContractAddress}`);
    const list = buildersBySlug.get(entry.slug) ?? [];
    list.push({
      address: lower(builder.address),
      ens: ensIndex.get(lower(builder.address)),
      cap: round(builder.amount),
      addedAt: Number(builder.timestamp),
    });
    buildersBySlug.set(entry.slug, list);
  }

  const cohorts = [];
  const builders = {};
  const withdrawals = {};

  for (const entry of COHORT_REGISTRY) {
    const ponderCohort = ponderByAddress.get(entry.address);
    const cohortWithdrawals = (withdrawalsBySlug.get(entry.slug) ?? []).sort((a, b) => b.timestamp - a.timestamp);
    const known = buildersBySlug.get(entry.slug) ?? [];

    // Builders who withdrew but have no live stream row — removed mid-cohort, or added
    // before the indexer's start block. Dropping them would drop their work logs' author.
    const byAddress = new Map(known.map(builder => [builder.address, { ...builder }]));
    for (const withdrawal of cohortWithdrawals) {
      if (!byAddress.has(withdrawal.builder)) {
        byAddress.set(withdrawal.builder, {
          address: withdrawal.builder,
          ens: ensIndex.get(withdrawal.builder),
          removed: true,
        });
      }
    }

    const cohortBuilders = [...byAddress.values()]
      .map(builder => {
        const mine = cohortWithdrawals.filter(w => w.builder === builder.address);
        return {
          ...builder,
          withdrawalCount: mine.length,
          totalWithdrawn: sum(mine, w => w.amount),
        };
      })
      .sort((a, b) => b.totalWithdrawn - a.totalWithdrawn || a.address.localeCompare(b.address));

    const timestamps = cohortWithdrawals.map(w => w.timestamp);

    cohorts.push({
      slug: entry.slug,
      address: entry.address,
      chainId: entry.chainId,
      name: entry.displayName,
      ...(entry.subdomain ? { subdomain: `${entry.subdomain}.buidlguidl.com` } : {}),
      ...(ponderCohort?.url ? { url: ponderCohort.url } : {}),
      ...(entry.blurb ? { blurb: entry.blurb } : {}),
      builderCount: cohortBuilders.length,
      withdrawalCount: cohortWithdrawals.length,
      totalWithdrawn: sum(cohortWithdrawals, w => w.amount),
      // ponder only. The v3 backend stopped indexing in early 2025 and its balances are stale.
      balance: ponderCohort ? round(weiToEth(ponderCohort.balance)) : 0,
      ...(timestamps.length
        ? { firstWithdrawalAt: Math.min(...timestamps), lastWithdrawalAt: Math.max(...timestamps) }
        : {}),
      ...(entry.legacyAddresses ? { legacyAddresses: entry.legacyAddresses } : {}),
    });

    builders[entry.slug] = cohortBuilders;
    withdrawals[entry.slug] = cohortWithdrawals;
  }

  const counted = cohorts.reduce((total, cohort) => total + cohort.withdrawalCount, 0);
  assert(
    counted === ponder.withdrawals.length,
    `cohort withdrawals: assigned ${counted} of ${ponder.withdrawals.length}`,
  );

  cohorts.sort((a, b) => b.totalWithdrawn - a.totalWithdrawn || a.slug.localeCompare(b.slug));
  return { cohorts, builders, withdrawals };
}

function buildStreams(v3, ensIndex) {
  const capByAddress = new Map();
  const streamAddressByAddress = new Map();
  for (const builder of v3.builders) {
    if (!builder.stream) continue;
    const key = lower(builder.id);
    if (builder.stream.cap !== undefined) capByAddress.set(key, round(Number(builder.stream.cap)));
    if (builder.stream.streamAddress) streamAddressByAddress.set(key, lower(builder.stream.streamAddress));
  }

  const withdrawalsByBuilder = new Map();
  for (const event of v3.events) {
    const address = lower(event.payload?.userAddress ?? "");
    if (!address) continue;
    const list = withdrawalsByBuilder.get(address) ?? [];
    list.push({
      tx: event.payload.tx ?? "",
      builder: address,
      ens: ensIndex.get(address),
      amount: round(Number(event.payload.amount ?? 0)),
      reason: event.payload.reason ?? "",
      timestamp: Math.floor(Number(event.timestamp) / 1000),
    });
    withdrawalsByBuilder.set(address, list);
  }

  const builders = [];
  const withdrawals = {};

  for (const [address, list] of withdrawalsByBuilder) {
    list.sort((a, b) => b.timestamp - a.timestamp);
    const timestamps = list.map(w => w.timestamp);
    builders.push({
      address,
      ...(ensIndex.get(address) ? { ens: ensIndex.get(address) } : {}),
      ...(capByAddress.has(address) ? { cap: capByAddress.get(address) } : {}),
      ...(streamAddressByAddress.has(address) ? { streamAddress: streamAddressByAddress.get(address) } : {}),
      withdrawalCount: list.length,
      totalWithdrawn: sum(list, w => w.amount),
      firstWithdrawalAt: Math.min(...timestamps),
      lastWithdrawalAt: Math.max(...timestamps),
    });
    withdrawals[address] = list;
  }

  builders.sort((a, b) => b.totalWithdrawn - a.totalWithdrawn || a.address.localeCompare(b.address));
  return { builders, withdrawals };
}

// ---------------------------------------------------------------- output

function writeJson(relativePath, data) {
  const target = path.join(OUT_DIR, relativePath);
  if (DRY_RUN) return;
  fs.mkdirSync(path.dirname(target), { recursive: true });
  // Two-space JSON matches prettier's own output, so `yarn format` never rewrites these files.
  fs.writeFileSync(target, `${JSON.stringify(data, null, 2)}\n`);
}

function printRedirects(cohorts) {
  const redirects = cohorts
    .filter(cohort => cohort.subdomain)
    .map(cohort => ({
      source: "/:path*",
      has: [{ type: "host", value: cohort.subdomain }],
      destination: `https://buidlguidl.com/grants/cohorts/${cohort.slug}`,
      permanent: true,
    }));
  log(`\n// vercel.json for the bg-redirects project\n${JSON.stringify({ redirects }, null, 2)}`);
}

// ---------------------------------------------------------------- main

async function main() {
  const nodeMajor = Number(process.versions.node.split(".")[0]);
  if (nodeMajor < 18) {
    console.error(`This script needs Node 18+ for global fetch (running ${process.version}).`);
    process.exit(1);
  }

  log("Snapshotting the BuidlGuidl grants archive.");
  if (DRY_RUN) log("(dry run — nothing will be written)\n");

  log("→ ponder indexer");
  const ponder = await fetchPonder();
  log(
    `  ${ponder.cohorts.length} cohorts · ${ponder.builders.length} builder streams · ` +
      `${ponder.withdrawals.length} withdrawals`,
  );

  log("→ v3 app backend");
  const v3 = await fetchV3();
  log(`  ${v3.cohorts.length} legacy cohort records · ${v3.builders.length} builders · ${v3.events.length} events`);

  const ensIndex = buildEnsIndex(ponder, v3);
  const { cohorts, builders, withdrawals } = buildCohorts(ponder, v3, ensIndex);

  log("→ verifying balances on-chain");
  for (const cohort of cohorts) {
    const onchain = await fetchOnchainBalance(cohort.address, cohort.chainId);
    const indexed = BigInt(ponder.cohorts.find(c => lower(c.address) === cohort.address)?.balance ?? "0");
    assert(
      onchain === indexed,
      `${cohort.slug}: indexer says ${indexed} wei but chain ${cohort.chainId} says ${onchain} wei — ` +
        `the indexer is behind and the snapshot would be wrong`,
    );
  }
  log(`  ${cohorts.length} cohort balances match the chain`);

  const streams = buildStreams(v3, ensIndex);
  log(`  ${streams.builders.length} app stream builders · ${Object.values(streams.withdrawals).flat().length} logs`);

  let grants = { completed: [], active: [], ecosystem: [], stats: null };
  if (wants("grants")) {
    log("→ grants.buidlguidl.com");
    grants = await fetchGrants();
    log(
      `  ${grants.completed.length} completed · ${grants.active.length} active · ` +
        `${grants.ecosystem.length} ecosystem impact`,
    );
  }

  const cohortTimestamps = ponder.withdrawals.map(w => Number(w.timestamp));
  const streamTimestamps = Object.values(streams.withdrawals)
    .flat()
    .map(w => w.timestamp);
  const programGrants = [...grants.completed, ...grants.active];

  // 30 people appear in both a cohort and an app stream, and grant recipients overlap with
  // both, so the headline count has to be a union rather than a sum.
  const uniqueBuilders = new Set([
    ...Object.values(builders)
      .flat()
      .map(b => b.address),
    ...streams.builders.map(b => b.address),
    ...programGrants.map(g => lower(g.builder)),
  ]);

  const meta = {
    generatedAt: new Date().toISOString(),
    ponderBlocks: ponder.blocks,
    sources: [PONDER_URL, V3_API, GRANTS_SITE],
    coverage: {
      cohortWithdrawals: { from: Math.min(...cohortTimestamps), to: Math.max(...cohortTimestamps) },
      streamWithdrawals: { from: Math.min(...streamTimestamps), to: Math.max(...streamTimestamps) },
      // The grants site only renders completed and active grants; proposed and rejected ones
      // live in a Firestore this snapshot has no access to.
      grantsNotPubliclyListed: grants.stats ? grants.stats.totalGrants - programGrants.length : 0,
    },
    totals: {
      uniqueBuilders: uniqueBuilders.size,
      cohorts: cohorts.length,
      cohortBuilders: new Set(
        Object.values(builders)
          .flat()
          .map(b => b.address),
      ).size,
      cohortWithdrawals: ponder.withdrawals.length,
      cohortEthStreamed: sum(cohorts, c => c.totalWithdrawn),
      cohortEthRemaining: sum(cohorts, c => c.balance),
      streamBuilders: streams.builders.length,
      streamWithdrawals: streamTimestamps.length,
      streamEthWithdrawn: sum(streams.builders, b => b.totalWithdrawn),
      appBuilders: v3.stats.builderCount,
      appBuilds: v3.stats.buildCount,
      grants: grants.stats?.totalGrants ?? 0,
      grantsEth: grants.stats?.totalEthGranted ?? 0,
      activeGrants: grants.stats?.activeGrants ?? 0,
      ecosystemGrants: grants.ecosystem.length,
      ecosystemEth: sum(grants.ecosystem, g => g.amount),
    },
  };

  writeJson("meta.json", meta);
  writeJson("cohorts.json", cohorts);
  writeJson("cohort-builders.json", builders);
  for (const [slug, list] of Object.entries(withdrawals)) {
    writeJson(path.join("cohort-withdrawals", `${slug}.json`), list);
    const size = JSON.stringify(list).length;
    if (size > WITHDRAWALS_SIZE_WARN) {
      warn(`${slug} withdrawals are ${Math.round(size / 1024)}kB — close to Next's 128kB page-data limit`);
    }
  }
  writeJson("streams.json", streams.builders);
  for (const [address, list] of Object.entries(streams.withdrawals)) {
    writeJson(path.join("stream-withdrawals", `${address}.json`), list);
  }
  if (wants("grants")) {
    writeJson("program-grants.json", {
      grants: programGrants,
      stats: {
        totalGrants: grants.stats.totalGrants,
        totalEthGranted: grants.stats.totalEthGranted,
        activeGrants: grants.stats.activeGrants,
        completedCount: grants.completed.length,
        completedEth: sum(grants.completed, g => g.amount),
      },
    });
    writeJson("ecosystem-grants.json", grants.ecosystem);
  }

  const t = meta.totals;
  log(
    `\n${t.cohorts} cohorts · ${t.cohortWithdrawals} withdrawals · ${t.cohortEthStreamed} ETH streamed · ` +
      `${t.cohortEthRemaining} ETH remaining · ${t.cohortBuilders} builders\n` +
      `${t.streamBuilders} stream builders · ${t.streamWithdrawals} withdrawals · ${t.streamEthWithdrawn} ETH\n` +
      `${grants.completed.length} completed grants · ${grants.active.length} active · ` +
      `${t.ecosystemGrants} ecosystem (${t.ecosystemEth} ETH) · ${t.grantsEth} ETH granted total`,
  );
  if (meta.coverage.grantsNotPubliclyListed > 0) {
    log(`(${meta.coverage.grantsNotPubliclyListed} grants are not publicly listed and are not in this snapshot)`);
  }
  log(DRY_RUN ? "\nDry run — no files written." : `\nWrote ${path.relative(process.cwd(), OUT_DIR)}`);

  if (hasFlag("print-redirects")) printRedirects(cohorts);
}

main().catch(error => {
  if (error instanceof SnapshotError) {
    console.error(`\nSnapshot aborted: ${error.message}`);
  } else {
    console.error("\nSnapshot failed:", error);
  }
  process.exit(1);
});
