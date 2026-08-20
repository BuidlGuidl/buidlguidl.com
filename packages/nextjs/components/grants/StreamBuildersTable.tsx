import { useEffect, useState } from "react";
import { BuilderAvatar } from "./BuilderAvatar";
import { StatCard } from "~~/components/2025/StatCard";
import TrackedLink from "~~/components/TrackedLink";
import { WithdrawalLog } from "~~/components/grants/WithdrawalLog";
import { builderLabel, explorerAddressUrl, formatEth, formatMonth, shortAddress } from "~~/utils/grants/explorer";
import { StreamBuilder, Withdrawal } from "~~/utils/grants/types";

const PAGE_SIZE = 20;

type StreamDetails = { builder: StreamBuilder; withdrawals: Withdrawal[] };

export const StreamBuildersTable = ({ builders }: { builders: StreamBuilder[] }) => {
  const [page, setPage] = useState(0);
  const [selectedBuilder, setSelectedBuilder] = useState<StreamBuilder | null>(null);
  const [details, setDetails] = useState<StreamDetails | null>(null);
  const [error, setError] = useState(false);
  const totalPages = Math.ceil(builders.length / PAGE_SIZE);
  const visible = builders.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  useEffect(() => {
    if (!selectedBuilder) return;
    const controller = new AbortController();
    setDetails(null);
    setError(false);
    fetch(`/api/grants/streams/${selectedBuilder.address}`, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error("Could not load stream");
        return response.json() as Promise<StreamDetails>;
      })
      .then(setDetails)
      .catch(fetchError => {
        if (fetchError.name !== "AbortError") setError(true);
      });
    return () => controller.abort();
  }, [selectedBuilder]);

  useEffect(() => {
    if (!selectedBuilder) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedBuilder(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedBuilder]);

  const label = selectedBuilder ? builderLabel(selectedBuilder.address, selectedBuilder.ens) : "";
  const activeRange =
    selectedBuilder?.firstWithdrawalAt && selectedBuilder.lastWithdrawalAt
      ? `${formatMonth(selectedBuilder.firstWithdrawalAt)} – ${formatMonth(selectedBuilder.lastWithdrawalAt)}`
      : null;

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
                  <button
                    type="button"
                    onClick={() => setSelectedBuilder(builder)}
                    className={`flex items-center gap-2 text-left hover:text-primary ${
                      builder.ens ? "font-medium" : "font-mono text-xs"
                    }`}
                  >
                    <BuilderAvatar address={builder.address} />
                    {builderLabel(builder.address, builder.ens)}
                  </button>
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

      {selectedBuilder && (
        <div
          className="modal modal-open cursor-pointer backdrop-blur-[2px]"
          style={{ backgroundColor: "rgba(24, 34, 50, 0.68)" }}
          role="presentation"
          onMouseDown={event => {
            if (event.target === event.currentTarget) setSelectedBuilder(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="stream-modal-title"
            className="modal-box max-w-4xl max-h-[90vh] relative cursor-default !bg-white text-base-content shadow-2xl ring-1 ring-black/10"
          >
            <button
              type="button"
              onClick={() => setSelectedBuilder(null)}
              className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3"
              aria-label="Close builder work log"
              autoFocus
            >
              ✕
            </button>
            <h3
              id="stream-modal-title"
              className={`flex items-center gap-3 text-2xl mt-0 mb-3 pr-10 ${selectedBuilder.ens ? "" : "font-mono"}`}
            >
              <BuilderAvatar address={selectedBuilder.address} />
              {label}
            </h3>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mb-6 font-mono text-xs text-base-content/60">
              {activeRange && (
                <span>
                  <span className="text-primary">$</span> active:{" "}
                  <span className="text-base-content">{activeRange}</span>
                </span>
              )}
              <span>
                <span className="text-primary">$</span> builder:{" "}
                <TrackedLink
                  id="grants-stream-builder"
                  href={explorerAddressUrl(selectedBuilder.address, 1)}
                  className="text-base-content hover:text-primary"
                >
                  {shortAddress(selectedBuilder.address)} ↗
                </TrackedLink>
              </span>
              {selectedBuilder.streamAddress && (
                <span>
                  <span className="text-primary">$</span> stream:{" "}
                  <TrackedLink
                    id="grants-stream-contract"
                    href={explorerAddressUrl(selectedBuilder.streamAddress, 1)}
                    className="text-base-content hover:text-primary"
                  >
                    {shortAddress(selectedBuilder.streamAddress)} ↗
                  </TrackedLink>
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <StatCard value={`${formatEth(selectedBuilder.totalWithdrawn, 2)} Ξ`} label="withdrawn" />
              <StatCard value={String(selectedBuilder.withdrawalCount)} label="withdrawals" />
              <StatCard
                value={selectedBuilder.cap ? `${formatEth(selectedBuilder.cap, 2)} Ξ` : "—"}
                label="monthly cap"
              />
            </div>
            <h4 className="text-xl mt-8 mb-2">Work log</h4>
            <p className="text-sm text-base-content/60 mt-0 mb-6">
              What {label} wrote when withdrawing from the stream, newest first.
            </p>
            {!details && !error && (
              <div className="flex justify-center py-10">
                <span className="loading loading-spinner loading-md" />
              </div>
            )}
            {error && <p className="text-sm text-error">Could not load this work log. Please try again.</p>}
            {details && (
              <WithdrawalLog
                key={details.builder.address}
                withdrawals={details.withdrawals}
                chainId={1}
                showBuilder={false}
              />
            )}
          </section>
        </div>
      )}
    </div>
  );
};
