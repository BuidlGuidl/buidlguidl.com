import Link from "next/link";
import { ChainBadge } from "./ChainBadge";
import { formatEth, formatMonth } from "~~/utils/grants/explorer";
import { CohortSummary } from "~~/utils/grants/types";

const activeRange = (cohort: CohortSummary) =>
  cohort.firstWithdrawalAt && cohort.lastWithdrawalAt
    ? `${formatMonth(cohort.firstWithdrawalAt)} – ${formatMonth(cohort.lastWithdrawalAt)}`
    : "—";

export const CohortTable = ({ cohorts }: { cohorts: CohortSummary[] }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="text-left border-b border-base-content/10">
          <th className="py-2 pr-4 font-medium">Cohort</th>
          <th className="py-2 pr-4 font-medium hidden md:table-cell">Active</th>
          <th className="py-2 pr-4 font-medium text-right">Builders</th>
          <th className="py-2 pr-4 font-medium text-right">Withdrawals</th>
          <th className="py-2 font-medium text-right">Streamed</th>
        </tr>
      </thead>
      <tbody>
        {cohorts.map(cohort => (
          <tr
            key={cohort.slug}
            id={`cohort-${cohort.slug}`}
            className="border-b border-base-content/5 last:border-none hover:bg-base-200/40 transition-colors scroll-mt-8"
          >
            <td className="py-3 pr-4">
              <Link href={`/grants-archive/cohorts/${cohort.slug}`} className="font-medium hover:text-primary">
                {cohort.name}
              </Link>
              <span className="ml-2 align-middle">
                <ChainBadge chainId={cohort.chainId} />
              </span>
            </td>
            <td className="py-3 pr-4 hidden md:table-cell font-mono text-xs text-base-content/50 whitespace-nowrap">
              {activeRange(cohort)}
            </td>
            <td className="py-3 pr-4 text-right tabular-nums">{cohort.builderCount}</td>
            <td className="py-3 pr-4 text-right tabular-nums">{cohort.withdrawalCount}</td>
            <td className="py-3 text-right tabular-nums whitespace-nowrap">{formatEth(cohort.totalWithdrawn, 2)} Ξ</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
