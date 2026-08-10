// Shapes of the committed snapshot in `data/grants`, written by `scripts/snapshot-grants.mjs`.
// The script writes plain JS and these pages read TS, so `services/grants.ts` asserts the keys
// at build time rather than letting a drift surface as `undefined` in the UI.

export type ChainId = 1 | 10;

export type CohortSummary = {
  slug: string;
  address: string;
  chainId: ChainId;
  name: string;
  subdomain?: string;
  url?: string;
  blurb?: string;
  builderCount: number;
  withdrawalCount: number;
  /** ETH withdrawn by builders over the cohort's life. */
  totalWithdrawn: number;
  /** ETH left in the contract at the moment of the snapshot. */
  balance: number;
  firstWithdrawalAt?: number;
  lastWithdrawalAt?: number;
  /** Superseded contracts for the same cohort. They get no page of their own. */
  legacyAddresses?: string[];
};

export type CohortBuilder = {
  address: string;
  ens?: string;
  /** Stream cap in ETH. Absent for builders only seen through withdrawals. */
  cap?: number;
  addedAt?: number;
  withdrawalCount: number;
  totalWithdrawn: number;
  /** Withdrew from the cohort but has no active stream in the indexer. */
  removed?: boolean;
};

export type Withdrawal = {
  tx: string;
  builder: string;
  ens?: string;
  amount: number;
  /** Builder-written work log. Free text, often with PR links and newlines. */
  reason: string;
  timestamp: number;
};

export type StreamBuilder = {
  address: string;
  ens?: string;
  cap?: number;
  streamAddress?: string;
  withdrawalCount: number;
  totalWithdrawn: number;
  firstWithdrawalAt?: number;
  lastWithdrawalAt?: number;
};

export type ProgramGrant = {
  title: string;
  description: string;
  /** ETH awarded. */
  amount: number;
  builder: string;
  ens?: string;
  status: "completed" | "active";
  /** Completed grants only. */
  completedAt?: number;
  /** Completed grants only: the SpeedRunEthereum build page. */
  buildLink?: string;
};

export type ProgramGrantsData = {
  grants: ProgramGrant[];
  stats: {
    totalGrants: number;
    totalEthGranted: number;
    activeGrants: number;
    completedCount: number;
    completedEth: number;
  };
};

export type EcosystemGrant = {
  name: string;
  description: string;
  amount: number;
  xLink?: string;
};

export type GrantsSnapshotMeta = {
  generatedAt: string;
  ponderBlocks: { mainnet: number; optimism: number };
  sources: string[];
  coverage: {
    cohortWithdrawals: { from: number; to: number };
    streamWithdrawals: { from: number; to: number };
    /** Grants the public site never renders (proposed/rejected), so absent here. */
    grantsNotPubliclyListed: number;
  };
  totals: {
    /** Distinct addresses across cohorts, app streams, and grants — these sets overlap. */
    uniqueBuilders: number;
    cohorts: number;
    cohortBuilders: number;
    cohortWithdrawals: number;
    cohortEthStreamed: number;
    cohortEthRemaining: number;
    streamBuilders: number;
    streamWithdrawals: number;
    streamEthWithdrawn: number;
    appBuilders: number;
    appBuilds: number;
    grants: number;
    grantsEth: number;
    activeGrants: number;
    ecosystemGrants: number;
    ecosystemEth: number;
  };
};
