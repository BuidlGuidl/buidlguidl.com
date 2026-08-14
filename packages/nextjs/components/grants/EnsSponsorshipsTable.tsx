import { useState } from "react";
import TrackedLink from "~~/components/TrackedLink";
import { explorerAddressUrl, explorerTxUrl, formatDate, formatEth, shortAddress } from "~~/utils/grants/explorer";
import { EnsSponsorship } from "~~/utils/grants/types";

const PAGE_SIZE = 30;

export const EnsSponsorshipsTable = ({ sponsorships }: { sponsorships: EnsSponsorship[] }) => {
  const [page, setPage] = useState(0);
  const [buildersOnly, setBuildersOnly] = useState(false);

  const filtered = buildersOnly ? sponsorships.filter(sponsorship => sponsorship.becameBuilder) : sponsorships;
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  // Clamped rather than reset, so toggling the filter keeps you roughly where you were.
  const currentPage = Math.min(page, Math.max(totalPages - 1, 0));
  const visible = filtered.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <span className="font-mono text-xs text-base-content/50">
          {filtered.length} {filtered.length === 1 ? "name" : "names"}
        </span>
        <label className="flex items-center gap-2 font-mono text-xs text-base-content/50 cursor-pointer">
          <input
            type="checkbox"
            className="checkbox checkbox-xs"
            checked={buildersOnly}
            onChange={event => setBuildersOnly(event.target.checked)}
          />
          only the ones who went on to build with us
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left border-b border-base-content/10">
              <th className="py-2 pr-4 font-medium">Name</th>
              <th className="py-2 pr-4 font-medium hidden sm:table-cell">Registered</th>
              <th className="py-2 pr-4 font-medium hidden md:table-cell">Funded by</th>
              <th className="py-2 font-medium text-right">Sent</th>
            </tr>
          </thead>
          <tbody>
            {visible.map(sponsorship => (
              <tr
                key={sponsorship.registrationTx + sponsorship.name}
                className="border-b border-base-content/5 last:border-none hover:bg-base-200/40 transition-colors"
              >
                <td className="py-3 pr-4">
                  <TrackedLink
                    id="grants-ens-name"
                    href={explorerTxUrl(sponsorship.registrationTx, 1)}
                    className="font-medium hover:text-primary transition-colors"
                  >
                    {sponsorship.name}
                  </TrackedLink>
                  {sponsorship.becameBuilder && (
                    <span
                      className="ml-2 align-middle font-mono text-[10px] text-primary/70 border border-primary/30 rounded px-1 py-px"
                      title="This person later held a BuidlGuidl stream or grant"
                    >
                      builder
                    </span>
                  )}
                  <TrackedLink
                    id="grants-ens-owner"
                    href={explorerAddressUrl(sponsorship.address, 1)}
                    className="block font-mono text-[10px] text-base-content/40 hover:text-primary transition-colors"
                  >
                    {shortAddress(sponsorship.address)}
                    <span className="sm:hidden"> · {formatDate(sponsorship.registeredAt)}</span>
                  </TrackedLink>
                </td>
                <td className="py-3 pr-4 hidden sm:table-cell font-mono text-xs text-base-content/50 whitespace-nowrap">
                  {formatDate(sponsorship.registeredAt)}
                </td>
                <td className="py-3 pr-4 hidden md:table-cell font-mono text-xs text-base-content/50 whitespace-nowrap">
                  <TrackedLink
                    id="grants-ens-funding"
                    href={explorerTxUrl(sponsorship.fundingTx, 1)}
                    className="hover:text-primary transition-colors"
                  >
                    {sponsorship.fundedBy}
                  </TrackedLink>
                </td>
                <td className="py-3 text-right tabular-nums whitespace-nowrap">
                  {formatEth(sponsorship.fundedEth, 3)} Ξ
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6 font-mono text-xs">
          <button
            type="button"
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="btn btn-xs btn-ghost normal-case disabled:opacity-30"
          >
            ← Prev
          </button>
          <span className="text-base-content/50">
            {currentPage + 1} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className="btn btn-xs btn-ghost normal-case disabled:opacity-30"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};
