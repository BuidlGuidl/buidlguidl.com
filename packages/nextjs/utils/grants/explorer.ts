import { ChainId } from "./types";

// The archive spans mainnet and Optimism, so explorer links are built per row.
// `utils/scaffold-eth/networks.ts` can't be reused here: it resolves against
// `scaffoldConfig.targetNetwork` and has no per-chain form.
const EXPLORERS: Record<ChainId, string> = {
  1: "https://etherscan.io",
  10: "https://optimistic.etherscan.io",
};

export const CHAIN_NAMES: Record<ChainId, string> = {
  1: "Ethereum",
  10: "Optimism",
};

export const explorerAddressUrl = (address: string, chainId: ChainId) => `${EXPLORERS[chainId]}/address/${address}`;

export const explorerTxUrl = (tx: string, chainId: ChainId) => `${EXPLORERS[chainId]}/tx/${tx}`;

export const shortAddress = (address: string) => `${address.slice(0, 6)}…${address.slice(-4)}`;

/** ENS name when the snapshot captured one, short address otherwise. */
export const builderLabel = (address: string, ens?: string) => ens || shortAddress(address);

export const formatEth = (amount: number, maxDecimals = 4) => {
  if (amount === 0) return "0";
  if (amount < 0.0001) return "<0.0001";
  return amount.toLocaleString("en-US", { maximumFractionDigits: maxDecimals });
};

export const formatDate = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

export const formatMonth = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleDateString("en-US", { year: "numeric", month: "short", timeZone: "UTC" });
