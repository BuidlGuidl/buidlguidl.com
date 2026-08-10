import TrackedLink from "~~/components/TrackedLink";
import { builderLabel, explorerAddressUrl } from "~~/utils/grants/explorer";
import { ChainId } from "~~/utils/grants/types";

interface BuilderCellProps {
  address: string;
  ens?: string;
  chainId?: ChainId;
  className?: string;
}

// ENS name as captured in the snapshot, short address otherwise.
//
// Deliberately not scaffold-eth's <Address />: that resolves ENS through wagmi at runtime,
// which is the Alchemy dependency this archive exists to retire, and it would fire one
// skeleton-to-resolved layout shift per row on logs that run to 139 entries.
export const BuilderCell = ({ address, ens, chainId = 1, className = "" }: BuilderCellProps) => (
  <TrackedLink
    id="grants-builder"
    href={explorerAddressUrl(address, chainId)}
    className={`hover:text-primary transition-colors ${ens ? "" : "font-mono text-[0.9em]"} ${className}`}
  >
    <span title={address}>{builderLabel(address, ens)}</span>
  </TrackedLink>
);
