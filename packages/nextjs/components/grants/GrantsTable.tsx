import { useEffect, useState } from "react";
import { BuilderCell } from "./BuilderCell";
import TrackedLink from "~~/components/TrackedLink";
import { formatDate, formatEth } from "~~/utils/grants/explorer";
import { ProgramGrant } from "~~/utils/grants/types";

const PAGE_SIZE = 15;

export const GrantsTable = ({ grants }: { grants: ProgramGrant[] }) => {
  const [page, setPage] = useState(0);
  const [selectedGrant, setSelectedGrant] = useState<ProgramGrant | null>(null);
  const totalPages = Math.ceil(grants.length / PAGE_SIZE);
  const visible = grants.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  useEffect(() => {
    if (!selectedGrant) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedGrant(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedGrant]);

  return (
    <div>
      <ul className="list-none p-0 m-0 border-y border-base-content/10 divide-y divide-base-content/10">
        {visible.map(grant => (
          <li
            key={`${grant.title}-${grant.builder}`}
            className="py-3 grid sm:grid-cols-[7rem_minmax(0,1fr)_10rem] gap-x-4 gap-y-1 items-center"
          >
            <span className="font-bold whitespace-nowrap">{formatEth(grant.amount)} ETH</span>
            <button
              type="button"
              onClick={() => setSelectedGrant(grant)}
              className="min-w-0 text-left hover:text-primary transition-colors"
              aria-label={`View details for ${grant.title}`}
            >
              <span className="font-medium block truncate">{grant.title}</span>
              <span className="block truncate text-sm text-base-content/60">{grant.description}</span>
            </button>
            <span className="flex sm:flex-col gap-2 sm:gap-0 sm:items-end text-xs text-base-content/60">
              <BuilderCell address={grant.builder} ens={grant.ens} className="text-xs" />
              {grant.completedAt && <span className="font-mono">{formatDate(grant.completedAt)}</span>}
            </span>
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

      {selectedGrant && (
        <div
          className="modal modal-open cursor-pointer backdrop-blur-[2px]"
          style={{ backgroundColor: "rgba(24, 34, 50, 0.68)" }}
          role="presentation"
          onMouseDown={event => {
            if (event.target === event.currentTarget) setSelectedGrant(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="grant-modal-title"
            className="modal-box relative cursor-default !bg-white text-base-content shadow-2xl ring-1 ring-black/10"
          >
            <button
              type="button"
              onClick={() => setSelectedGrant(null)}
              className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3"
              aria-label="Close grant details"
              autoFocus
            >
              ✕
            </button>
            <p className="font-mono text-xs text-base-content/50 mb-2">
              {formatEth(selectedGrant.amount)} ETH
              {selectedGrant.completedAt ? ` · ${formatDate(selectedGrant.completedAt)}` : ""}
            </p>
            <h3 id="grant-modal-title" className="text-xl font-bold mt-0 pr-10">
              {selectedGrant.title}
            </h3>
            <div className="mb-4">
              <BuilderCell address={selectedGrant.builder} ens={selectedGrant.ens} />
            </div>
            <p className="text-sm text-base-content/70 leading-relaxed whitespace-pre-line">
              {selectedGrant.description}
            </p>
            {selectedGrant.buildLink && (
              <TrackedLink
                id="grants-build-link"
                href={selectedGrant.buildLink}
                className="inline-block mt-2 font-mono text-xs text-primary hover:underline"
              >
                → view the build
              </TrackedLink>
            )}
          </section>
        </div>
      )}
    </div>
  );
};
