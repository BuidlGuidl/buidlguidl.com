import fs from "fs";
import path from "path";
import {
  CohortBuilder,
  CohortSummary,
  EcosystemGrant,
  EnsSponsorshipsData,
  GrantsSnapshotMeta,
  ProgramGrantsData,
  StreamBuilder,
  Withdrawal,
} from "~~/utils/grants/types";

// Reads the committed snapshot written by `scripts/snapshot-grants.mjs`. Build time only:
// every /grants route is statically generated, so none of this reaches the browser.
//
// Per-cohort withdrawals live in their own files so a detail page only ships its own log —
// the largest cohort is ~115kB on its own, against Next's 128kB page-data limit.
const DATA_DIR = path.join(process.cwd(), "data/grants");

const cache = new Map<string, unknown>();

function readJson<T>(relativePath: string, command = "snapshot:grants"): T {
  const cached = cache.get(relativePath);
  if (cached) return cached as T;

  const file = path.join(DATA_DIR, relativePath);
  if (!fs.existsSync(file)) {
    throw new Error(`Missing grants snapshot file: ${relativePath}. Run \`yarn ${command}\`.`);
  }

  const parsed = JSON.parse(fs.readFileSync(file, "utf8")) as T;
  cache.set(relativePath, parsed);
  return parsed;
}

// The snapshot is written by a plain JS script and read as typed data here, so a shape change
// on the writing side should fail the build loudly instead of rendering blanks.
function assertKeys(value: unknown, keys: string[], label: string, command = "snapshot:grants") {
  const missing = keys.filter(key => !(key in (value as Record<string, unknown>)));
  if (missing.length) {
    throw new Error(`Grants snapshot ${label} is missing ${missing.join(", ")}. Re-run \`yarn ${command}\`.`);
  }
}

export function getGrantsMeta(): GrantsSnapshotMeta {
  const meta = readJson<GrantsSnapshotMeta>("meta.json");
  assertKeys(meta, ["generatedAt", "totals", "coverage"], "meta.json");
  return meta;
}

export function getCohorts(): CohortSummary[] {
  const cohorts = readJson<CohortSummary[]>("cohorts.json");
  if (!cohorts.length) throw new Error("Grants snapshot has no cohorts.");
  assertKeys(cohorts[0], ["slug", "address", "chainId", "name", "totalWithdrawn"], "cohorts.json");
  return cohorts;
}

export function getCohortSlugs(): string[] {
  return getCohorts().map(cohort => cohort.slug);
}

export function getCohort(
  slug: string,
): { cohort: CohortSummary; builders: CohortBuilder[]; withdrawals: Withdrawal[] } | null {
  const cohort = getCohorts().find(item => item.slug === slug);
  if (!cohort) return null;

  const builders = readJson<Record<string, CohortBuilder[]>>("cohort-builders.json")[slug] ?? [];
  const withdrawals = readJson<Withdrawal[]>(path.join("cohort-withdrawals", `${slug}.json`));
  return { cohort, builders, withdrawals };
}

export function getStreamBuilders(): StreamBuilder[] {
  const builders = readJson<StreamBuilder[]>("streams.json");
  if (!builders.length) throw new Error("Grants snapshot has no stream builders.");
  assertKeys(builders[0], ["address", "withdrawalCount", "totalWithdrawn"], "streams.json");
  return builders;
}

export function getStreamAddresses(): string[] {
  return getStreamBuilders().map(builder => builder.address);
}

export function getStreamBuilder(address: string): { builder: StreamBuilder; withdrawals: Withdrawal[] } | null {
  const builder = getStreamBuilders().find(item => item.address === address.toLowerCase());
  if (!builder) return null;

  const withdrawals = readJson<Withdrawal[]>(path.join("stream-withdrawals", `${builder.address}.json`));
  return { builder, withdrawals };
}

export function getProgramGrants(): ProgramGrantsData {
  const data = readJson<ProgramGrantsData>("program-grants.json");
  assertKeys(data, ["grants", "stats"], "program-grants.json");
  const grants = data.grants.filter(grant => grant.status === "completed");
  return {
    grants,
    stats: {
      totalGrants: grants.length,
      totalEthGranted: grants.reduce((total, grant) => total + grant.amount, 0),
      activeGrants: 0,
      completedCount: grants.length,
      completedEth: grants.reduce((total, grant) => total + grant.amount, 0),
    },
  };
}

export function getEcosystemGrants(): EcosystemGrant[] {
  return readJson<EcosystemGrant[]>("ecosystem-grants.json");
}

// Written by `scripts/snapshot-ens-sponsorships.mjs`, on its own schedule: its sources are all
// onchain, so unlike the rest of this snapshot it can still be rebuilt after the sites are gone.
export function getEnsSponsorships(): EnsSponsorshipsData {
  const data = readJson<EnsSponsorshipsData>("ens-sponsorships.json", "snapshot:ens");
  assertKeys(data, ["generatedAt", "stats", "sponsorships"], "ens-sponsorships.json", "snapshot:ens");
  if (!data.sponsorships.length) throw new Error("ENS sponsorships snapshot is empty.");
  return data;
}
