import { useState } from "react";
import { BuilderCell } from "./BuilderCell";
import { WithdrawalReason } from "./WithdrawalReason";
import TrackedLink from "~~/components/TrackedLink";
import { explorerTxUrl, formatDate, formatEth } from "~~/utils/grants/explorer";
import { ChainId, Withdrawal } from "~~/utils/grants/types";

const PAGE_SIZE = 25;

interface WithdrawalLogProps {
  withdrawals: Withdrawal[];
  chainId: ChainId;
  /** Hide the builder column when every row belongs to the same person. */
  showBuilder?: boolean;
}

// Cards rather than table rows: a single reason can run to thousands of characters, which in a
// <td> would collapse every other column on the page.
export const WithdrawalLog = ({ withdrawals, chainId, showBuilder = true }: WithdrawalLogProps) => {
  const [shown, setShown] = useState(PAGE_SIZE);

  if (withdrawals.length === 0) {
    return <p className="text-sm text-base-content/50 m-0">No withdrawals were recorded for this stream.</p>;
  }

  const visible = withdrawals.slice(0, shown);

  return (
    <div>
      <ul className="list-none p-0 m-0 flex flex-col gap-3">
        {visible.map(withdrawal => (
          <li
            key={withdrawal.tx + withdrawal.timestamp}
            className="border border-base-content/10 rounded-xl p-4 flex flex-col sm:flex-row gap-3 sm:gap-5"
          >
            <div className="sm:w-40 shrink-0 flex flex-row sm:flex-col items-baseline sm:items-start gap-3 sm:gap-1">
              <span className="font-bold whitespace-nowrap">{formatEth(withdrawal.amount)} ETH</span>
              <span className="font-mono text-xs text-base-content/50">{formatDate(withdrawal.timestamp)}</span>
              {showBuilder && (
                <BuilderCell
                  address={withdrawal.builder}
                  ens={withdrawal.ens}
                  chainId={chainId}
                  className="text-xs text-base-content/60"
                />
              )}
              {withdrawal.tx && (
                <TrackedLink
                  id="grants-withdrawal-tx"
                  href={explorerTxUrl(withdrawal.tx, chainId)}
                  className="font-mono text-[11px] text-base-content/40 hover:text-primary transition-colors"
                >
                  tx ↗
                </TrackedLink>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <WithdrawalReason reason={withdrawal.reason} />
            </div>
          </li>
        ))}
      </ul>

      {shown < withdrawals.length && (
        <button
          type="button"
          onClick={() => setShown(shown + PAGE_SIZE)}
          className="btn btn-sm btn-outline mt-6 normal-case"
        >
          Show {Math.min(PAGE_SIZE, withdrawals.length - shown)} more of {withdrawals.length}
        </button>
      )}
    </div>
  );
};
