import { CHAIN_NAMES } from "~~/utils/grants/explorer";
import { ChainId } from "~~/utils/grants/types";

const STYLES: Record<ChainId, string> = {
  1: "bg-[#EDEFFF] text-[#4b4bb5]",
  10: "bg-[#ffe5e5] text-[#c2334d]",
};

export const ChainBadge = ({ chainId }: { chainId: ChainId }) => (
  <span className={`inline-block font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded ${STYLES[chainId]}`}>
    {CHAIN_NAMES[chainId]}
  </span>
);
