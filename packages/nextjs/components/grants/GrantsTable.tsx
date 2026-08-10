import { useState } from "react";
import { BuilderCell } from "./BuilderCell";
import TrackedLink from "~~/components/TrackedLink";
import { formatDate, formatEth } from "~~/utils/grants/explorer";
import { ProgramGrant } from "~~/utils/grants/types";

const PAGE_SIZE = 25;

export const GrantsTable = ({ grants }: { grants: ProgramGrant[] }) => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(grants.length / PAGE_SIZE);
  const visible = grants.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div>
      <ul className="list-none p-0 m-0 flex flex-col gap-3">
        {visible.map(grant => (
          <li
            key={`${grant.title}-${grant.builder}`}
            className="border border-base-content/10 rounded-xl p-4 flex flex-col sm:flex-row gap-2 sm:gap-5"
          >
            <div className="sm:w-32 shrink-0 flex flex-row sm:flex-col items-baseline sm:items-start gap-3 sm:gap-1">
              <span className="font-bold whitespace-nowrap">{formatEth(grant.amount)} ETH</span>
              <span className="font-mono text-xs text-base-content/50">
                {grant.completedAt ? formatDate(grant.completedAt) : "in progress"}
              </span>
              <BuilderCell address={grant.builder} ens={grant.ens} className="text-xs text-base-content/60" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="m-0 font-medium">{grant.title}</p>
              <p className="mt-1 mb-0 text-sm text-base-content/70 leading-relaxed whitespace-pre-line">
                {grant.description}
              </p>
              {grant.buildLink && (
                <TrackedLink
                  id="grants-build-link"
                  href={grant.buildLink}
                  className="inline-block mt-2 font-mono text-xs text-primary hover:underline"
                >
                  → view the build
                </TrackedLink>
              )}
            </div>
          </li>
        ))}
      </ul>

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
