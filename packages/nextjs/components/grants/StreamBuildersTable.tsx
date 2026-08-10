import { useState } from "react";
import Link from "next/link";
import { builderLabel, formatEth, formatMonth } from "~~/utils/grants/explorer";
import { StreamBuilder } from "~~/utils/grants/types";

const PAGE_SIZE = 25;

export const StreamBuildersTable = ({ builders }: { builders: StreamBuilder[] }) => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(builders.length / PAGE_SIZE);
  const visible = builders.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left border-b border-base-content/10">
              <th className="py-2 pr-4 font-medium">Builder</th>
              <th className="py-2 pr-4 font-medium hidden md:table-cell">Active</th>
              <th className="py-2 pr-4 font-medium text-right">Withdrawals</th>
              <th className="py-2 font-medium text-right">Withdrawn</th>
            </tr>
          </thead>
          <tbody>
            {visible.map(builder => (
              <tr
                key={builder.address}
                className="border-b border-base-content/5 last:border-none hover:bg-base-200/40 transition-colors"
              >
                <td className="py-3 pr-4">
                  <Link
                    href={`/grants/streams/${builder.address}`}
                    className={`hover:text-primary ${builder.ens ? "font-medium" : "font-mono text-xs"}`}
                  >
                    {builderLabel(builder.address, builder.ens)}
                  </Link>
                </td>
                <td className="py-3 pr-4 hidden md:table-cell font-mono text-xs text-base-content/50 whitespace-nowrap">
                  {builder.firstWithdrawalAt && builder.lastWithdrawalAt
                    ? `${formatMonth(builder.firstWithdrawalAt)} – ${formatMonth(builder.lastWithdrawalAt)}`
                    : "—"}
                </td>
                <td className="py-3 pr-4 text-right tabular-nums">{builder.withdrawalCount}</td>
                <td className="py-3 text-right tabular-nums whitespace-nowrap">
                  {formatEth(builder.totalWithdrawn, 2)} Ξ
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
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            className="btn btn-xs btn-ghost normal-case disabled:opacity-30"
          >
            ← Prev
          </button>
          <span className="text-base-content/50">
            {page + 1} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages - 1}
            className="btn btn-xs btn-ghost normal-case disabled:opacity-30"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};
