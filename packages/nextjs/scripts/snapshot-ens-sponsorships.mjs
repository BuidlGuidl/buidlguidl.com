#!/usr/bin/env node
//
// Snapshots the ENS names BuidlGuidl paid for into `data/grants/ens-sponsorships.json`.
//
// Austin funded a lot of people's first ENS name: he'd send enough ETH to cover a
// registration, and they'd register it themselves minutes later. Later that moved to the
// scholarship contract behind scholarship.buidlguidl.com. None of it was ever written down
// anywhere, so this reconstructs it from chain data.
//
//   yarn snapshot:ens
//   yarn snapshot:ens --dry-run
//   yarn snapshot:ens --window=30
//
// The match is not a guess about transfer sizes. `ETHRegistrarController` emits
// `NameRegistered(string name, bytes32 indexed label, address indexed owner, ...)` with the
// owner as an indexed topic, so every address BuidlGuidl funded can be asked directly which
// names it registered, for what price, and when. A name counts as sponsored when its
// registration lands within MATCH_WINDOW_DAYS of the funding that preceded it.
//
// Sources (all onchain, all through Blockscout's free API — no key, no rate limit to buy):
//   - funder tx lists    plain ETH sends out of atg.eth
//   - scholarship v1     relayed calls, recipient and amount decoded from calldata
//   - scholarship v2     `EtherSent` events
//   - ENS controllers    `NameRegistered` logs, filtered by owner
//
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const BLOCKSCOUT = "https://eth.blockscout.com/api";

// Every address BuidlGuidl paid ENS registrations from. Add one here and re-run.
const FUNDERS = [{ address: "0x34aa3f359a9d614239015126635ce7732c18fdf3", label: "atg.eth" }];

// scholarship.buidlguidl.com, in two deployments. v1 is unverified and routes payouts
// through a relayed call, so its recipients come out of calldata: word 0 is the recipient,
// word 1 the amount in wei. Blockscout's internal-transaction index is missing five of
// these, which is why they are not read from there.
const SCHOLARSHIP = [
  { address: "0x924e029aa245abadc5ebd379457eaa48cf0e4422", version: "v1", relaySelector: "0xd1fbffa0" },
  { address: "0xca460716a9b81d413d53f2f605549afde7843de4", version: "v2" },
];
// EtherSent(address indexed recipient, uint256 amount)
const ETHER_SENT_TOPIC = "0x6109e2559dfa766aaec7118351d48a523f0a4157f49c8d68749c8ac41318ad12";

// Names the timing lines up with by coincidence rather than sponsorship. `ethbuild.eth` was
// registered a fortnight after a 2 ETH transfer that had nothing to do with it.
const NOT_SPONSORED = new Set(["ethbuild.eth"]);

// NameRegistered, before and after the March 2023 controller split the price into base+premium.
const NAME_REGISTERED = {
  "0xca6abbe9d7f11422cb6ca7629fbf6fe9efb1c621f71ce8f02b9f2a230097404f": { costWords: 1 },
  "0x69e37f151eb98a09618ddaa80c8cfaf1ce5996867c489f45b555b412271ebf27": { costWords: 2 },
};

const OUT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "data", "grants");
const OUT_FILE = "ens-sponsorships.json";

// How long after being funded a registration still counts. Nearly everyone registered the
// same day; the tail is people who waited for a weekend.
const DEFAULT_WINDOW_DAYS = 30;
// Blocks to search around a funding transaction. Generous on both sides — the exact cutoff
// is applied to timestamps afterwards, this only has to be wide enough not to miss anything.
const LOOKBEHIND_BLOCKS = 50_000;
const LOOKAHEAD_BLOCKS = 432_000;
const REQUEST_GAP_MS = 120;
const MAX_RETRIES = 4;

const args = process.argv.slice(2);
const hasFlag = name => args.includes(`--${name}`);
const flagValue = name => args.find(a => a.startsWith(`--${name}=`))?.split("=")[1];

const DRY_RUN = hasFlag("dry-run");
const WINDOW_DAYS = Number(flagValue("window") ?? DEFAULT_WINDOW_DAYS);

// ---------------------------------------------------------------- helpers

const log = (...parts) => console.log(...parts);

class SnapshotError extends Error {}
const fail = message => {
  throw new SnapshotError(message);
};
const assert = (condition, message) => {
  if (!condition) fail(message);
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const round = (value, decimals = 6) => Number(value.toFixed(decimals));
const weiToEth = wei => Number(BigInt(wei)) / 1e18;
const lower = value => String(value).toLowerCase();
const wordAt = (calldata, index) => calldata.slice(10 + index * 64, 10 + (index + 1) * 64);
// Takes a 32-byte word either way round: calldata arrives unprefixed, log topics with `0x`.
const addressFromWord = word => `0x${word.slice(-40)}`;
const topicAddress = address => `0x${"0".repeat(24)}${lower(address).slice(2)}`;

/**
 * Blockscout answers `{ status, message, result }` and says "No logs found" rather than
 * returning an empty list, so a bare `response.ok` is not enough to tell apart an empty
 * answer from a throttled one.
 */
async function blockscout(params, label) {
  const url = `${BLOCKSCOUT}?${new URLSearchParams(params)}`;
  let last = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, { headers: { "user-agent": "buidlguidl.com grants archive snapshot" } });
      const body = await response.json();
      if (body.message === "OK" || body.message?.startsWith("No ")) return body.result ?? [];
      last = `${response.status} ${body.message ?? ""}`;
    } catch (error) {
      last = error.message;
    }
    await sleep(1500 * (attempt + 1));
  }

  fail(`${label}: ${last} (after ${MAX_RETRIES} attempts)`);
}

const transactionList = (address, label) =>
  blockscout(
    { module: "account", action: "txlist", address, startblock: 0, endblock: 99999999, sort: "asc" },
    `txlist ${label}`,
  );

// ---------------------------------------------------------------- funding

/** Plain ETH sends out of a funder's own address. Contract calls are somebody else's business. */
async function fetchFunderSends({ address, label }) {
  const transactions = await transactionList(address, label);
  const sends = transactions
    .filter(tx => lower(tx.from) === lower(address) && tx.isError === "0" && BigInt(tx.value) > 0n)
    .filter(tx => tx.input === "0x" || tx.input === "")
    .map(tx => ({
      source: label,
      to: lower(tx.to),
      block: Number(tx.blockNumber),
      timestamp: Number(tx.timeStamp),
      eth: weiToEth(tx.value),
      tx: lower(tx.hash),
    }));

  assert(sends.length > 0, `${label} has no outgoing ETH transfers — the tx list looks wrong`);
  log(`  ${label}: ${sends.length} sends to ${new Set(sends.map(s => s.to)).size} addresses`);
  return sends;
}

async function fetchScholarshipPayouts(contract) {
  const label = `scholarship ${contract.version}`;
  let payouts;

  if (contract.relaySelector) {
    const transactions = await transactionList(contract.address, label);
    payouts = transactions
      .filter(tx => lower(tx.to) === contract.address && tx.isError === "0")
      .filter(tx => lower(tx.input).startsWith(contract.relaySelector))
      .map(tx => ({
        source: "scholarship",
        to: addressFromWord(wordAt(lower(tx.input), 0)),
        block: Number(tx.blockNumber),
        timestamp: Number(tx.timeStamp),
        wei: BigInt(`0x${wordAt(lower(tx.input), 1)}`),
        tx: lower(tx.hash),
      }))
      // The same relay carried non-payment calls, like setting the contract's own ENS name.
      .filter(payout => payout.wei > 0n)
      .map(({ wei, ...payout }) => ({ ...payout, eth: weiToEth(wei) }));
  } else {
    const logs = await blockscout(
      {
        module: "logs",
        action: "getLogs",
        address: contract.address,
        topic0: ETHER_SENT_TOPIC,
        fromBlock: 0,
        toBlock: 99999999,
      },
      `${label} EtherSent`,
    );
    payouts = logs.map(entry => ({
      source: "scholarship",
      to: addressFromWord(entry.topics[1]),
      block: parseInt(entry.blockNumber, 16),
      timestamp: parseInt(entry.timeStamp, 16),
      eth: weiToEth(BigInt(entry.data)),
      tx: lower(entry.transactionHash),
    }));
  }

  assert(payouts.length > 0, `${label} produced no payouts — the contract or its ABI changed`);
  log(`  ${label}: ${payouts.length} payouts to ${new Set(payouts.map(p => p.to)).size} addresses`);
  return payouts;
}

// ---------------------------------------------------------------- ens

/**
 * Every .eth name an address registered around the time it was funded. `owner` is an indexed
 * topic on both controller versions, so this is one query per address rather than a scan of
 * every registration ENS ever made.
 */
async function fetchRegistrations(address, fundings) {
  const fromBlock = Math.max(0, Math.min(...fundings.map(f => f.block)) - LOOKBEHIND_BLOCKS);
  const toBlock = Math.max(...fundings.map(f => f.block)) + LOOKAHEAD_BLOCKS;

  const logs = await blockscout(
    { module: "logs", action: "getLogs", fromBlock, toBlock, topic2: topicAddress(address) },
    `registrations for ${address}`,
  );

  return logs.filter(entry => NAME_REGISTERED[entry.topics[0]]).map(decodeRegistration);
}

/**
 * `NameRegistered(string name, ..., uint256 cost[, uint256 premium], uint256 expires)`. The
 * name is the only dynamic argument, so its offset is always the first data word and its
 * length the word at that offset — no ABI decoder needed for a shape this fixed.
 */
function decodeRegistration(entry) {
  const data = entry.data.slice(2);
  const word = index => data.slice(index * 64, (index + 1) * 64);

  const offset = Number(BigInt(`0x${word(0)}`)) / 32;
  const length = Number(BigInt(`0x${word(offset)}`));
  const hex = data.slice((offset + 1) * 64, (offset + 1) * 64 + length * 2);
  const name = Buffer.from(hex, "hex").toString("utf8");

  const { costWords } = NAME_REGISTERED[entry.topics[0]];
  let cost = 0n;
  for (let index = 1; index <= costWords; index++) cost += BigInt(`0x${word(index)}`);

  return {
    name: `${name}.eth`,
    registeredAt: parseInt(entry.timeStamp, 16),
    registrationCost: round(weiToEth(cost)),
    registrationTx: lower(entry.transactionHash),
  };
}

// ---------------------------------------------------------------- builders

/**
 * How many of these people went on to hold a BuidlGuidl stream. Matched on ENS name as well
 * as address: people moved wallets, and the name they were given is what followed them.
 */
function loadBuilderIdentities() {
  const read = file => {
    const target = path.join(OUT_DIR, file);
    assert(fs.existsSync(target), `${file} is missing. Run \`yarn snapshot:grants\` first.`);
    return JSON.parse(fs.readFileSync(target, "utf8"));
  };

  const addresses = new Set();
  const names = new Set();
  const add = builder => {
    if (builder.address) addresses.add(lower(builder.address));
    if (builder.ens) names.add(lower(builder.ens));
  };

  for (const list of Object.values(read("cohort-builders.json"))) list.forEach(add);
  read("streams.json").forEach(add);
  for (const grant of read("program-grants.json").grants ?? []) add({ address: grant.builder, ens: grant.ens });

  return { addresses, names };
}

// ---------------------------------------------------------------- main

async function main() {
  log(`Collecting ENS sponsorships (match window ${WINDOW_DAYS} days)\n`);

  const fundings = [];
  for (const funder of FUNDERS) fundings.push(...(await fetchFunderSends(funder)));
  for (const contract of SCHOLARSHIP) fundings.push(...(await fetchScholarshipPayouts(contract)));

  const funderAddresses = new Set(FUNDERS.map(funder => lower(funder.address)));
  const byRecipient = new Map();
  for (const funding of fundings) {
    // Decoding a recipient out of the wrong offset stays silent otherwise: the queries still
    // run, they just never match anything.
    assert(/^0x[0-9a-f]{40}$/.test(funding.to), `${funding.source} decoded a bad recipient: ${funding.to}`);
    // Austin moving ETH between his own addresses, and the odd refund back to the sender.
    if (funderAddresses.has(funding.to)) continue;
    if (!byRecipient.has(funding.to)) byRecipient.set(funding.to, []);
    byRecipient.get(funding.to).push(funding);
  }

  log(`\n${fundings.length} fundings to ${byRecipient.size} addresses. Checking each for ENS registrations…`);

  const sponsorships = [];
  let checked = 0;
  for (const [address, funded] of byRecipient) {
    for (const registration of await fetchRegistrations(address, funded)) {
      if (NOT_SPONSORED.has(registration.name)) continue;

      // The funding that paid for it: the most recent one before the name was registered.
      const funding = funded
        .filter(entry => entry.timestamp <= registration.registeredAt)
        .sort((a, b) => b.timestamp - a.timestamp)[0];
      if (!funding) continue;

      const days = (registration.registeredAt - funding.timestamp) / 86400;
      if (days > WINDOW_DAYS) continue;

      sponsorships.push({
        ...registration,
        address,
        fundedBy: funding.source,
        fundedEth: round(funding.eth),
        fundedAt: funding.timestamp,
        fundingTx: funding.tx,
        daysToRegister: round(days, 2),
      });
    }

    if (++checked % 100 === 0) log(`  ${checked}/${byRecipient.size} · ${sponsorships.length} names so far`);
    await sleep(REQUEST_GAP_MS);
  }

  assert(sponsorships.length > 0, "no sponsored registrations found — the ENS event shape may have changed");
  sponsorships.sort((a, b) => a.registeredAt - b.registeredAt);

  const builders = loadBuilderIdentities();
  for (const sponsorship of sponsorships) {
    sponsorship.becameBuilder =
      builders.addresses.has(sponsorship.address) || builders.names.has(lower(sponsorship.name));
  }

  const people = new Set(sponsorships.map(s => s.address));
  const builderPeople = new Set(sponsorships.filter(s => s.becameBuilder).map(s => s.address));
  const snapshot = {
    generatedAt: new Date().toISOString(),
    matchWindowDays: WINDOW_DAYS,
    funders: FUNDERS.map(funder => funder.label),
    sources: [BLOCKSCOUT, ...SCHOLARSHIP.map(contract => contract.address)],
    stats: {
      names: sponsorships.length,
      people: people.size,
      sameDay: sponsorships.filter(s => s.daysToRegister <= 1).length,
      becameBuilders: builderPeople.size,
      ethSent: round(
        sponsorships.reduce((total, s) => total + s.fundedEth, 0),
        4,
      ),
      ethRegistrationFees: round(
        sponsorships.reduce((total, s) => total + s.registrationCost, 0),
        4,
      ),
      firstAt: sponsorships[0].registeredAt,
      lastAt: sponsorships[sponsorships.length - 1].registeredAt,
      byFunding: {
        direct: sponsorships.filter(s => s.fundedBy !== "scholarship").length,
        scholarship: sponsorships.filter(s => s.fundedBy === "scholarship").length,
      },
    },
    sponsorships,
  };

  if (!DRY_RUN) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    // Two-space JSON matches prettier's own output, so `yarn format` never rewrites this file.
    fs.writeFileSync(path.join(OUT_DIR, OUT_FILE), `${JSON.stringify(snapshot, null, 2)}\n`);
  }

  const stats = snapshot.stats;
  log(
    `\n${stats.names} names for ${stats.people} people · ${stats.sameDay} registered within a day\n` +
      `${stats.byFunding.direct} funded directly · ${stats.byFunding.scholarship} through the scholarship contract\n` +
      `${stats.ethSent} ETH sent · ${stats.ethRegistrationFees} ETH of it spent on registrations\n` +
      `${stats.becameBuilders} of these people later held a BuidlGuidl stream`,
  );
  log(DRY_RUN ? "\nDry run — no files written." : `\nWrote ${path.relative(process.cwd(), path.join(OUT_DIR, OUT_FILE))}`);
}

main().catch(error => {
  if (error instanceof SnapshotError) {
    console.error(`\nSnapshot aborted: ${error.message}`);
  } else {
    console.error("\nSnapshot failed:", error);
  }
  process.exit(1);
});
