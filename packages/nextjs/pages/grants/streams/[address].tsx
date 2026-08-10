import Link from "next/link";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { StatCard } from "~~/components/2025/StatCard";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { MetaHeader } from "~~/components/MetaHeader";
import TrackedLink from "~~/components/TrackedLink";
import { WithdrawalLog } from "~~/components/grants/WithdrawalLog";
import { getStreamAddresses, getStreamBuilder } from "~~/services/grants";
import { builderLabel, explorerAddressUrl, formatEth, formatMonth, shortAddress } from "~~/utils/grants/explorer";
import { StreamBuilder, Withdrawal } from "~~/utils/grants/types";

interface PageProps {
  builder: StreamBuilder;
  withdrawals: Withdrawal[];
}

const StreamPage: NextPage<PageProps> = ({ builder, withdrawals }) => {
  const label = builderLabel(builder.address, builder.ens);
  const activeRange =
    builder.firstWithdrawalAt && builder.lastWithdrawalAt
      ? `${formatMonth(builder.firstWithdrawalAt)} – ${formatMonth(builder.lastWithdrawalAt)}`
      : null;

  return (
    <>
      <MetaHeader
        title={`${label}'s BuidlGuidl stream - Grants Archive`}
        description={`${label} withdrew ${formatEth(builder.totalWithdrawn, 2)} ETH across ${
          builder.withdrawalCount
        } withdrawals from a BuidlGuidl builder stream, with the work logged for each one.`}
        image={`api/og?title=${encodeURIComponent(`${label}'s stream`)}`}
        path={`/grants/streams/${builder.address}`}
      />

      <div className="hero-fade">
        <Header transparent />
        <header className="w-full max-w-[860px] mx-auto px-5 sm:px-6 pt-4 pb-10 sm:pt-8 sm:pb-14">
          <Link
            href="/grants#streams"
            className="inline-block font-mono text-xs text-base-content/50 hover:text-primary transition-colors mb-4"
          >
            ← Grants archive
          </Link>
          <h1 className={`text-3xl sm:text-[2.5rem] sm:leading-[1.15] mt-0 mb-4 ${builder.ens ? "" : "font-mono"}`}>
            {label}
          </h1>

          <div className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-base-content/60">
            {activeRange && (
              <span>
                <span className="text-primary">$</span> active: <span className="text-base-content">{activeRange}</span>
              </span>
            )}
            <span>
              <span className="text-primary">$</span> builder:{" "}
              <TrackedLink
                id="grants-stream-builder"
                href={explorerAddressUrl(builder.address, 1)}
                className="text-base-content hover:text-primary transition-colors"
              >
                {shortAddress(builder.address)} ↗
              </TrackedLink>
            </span>
            {builder.streamAddress && (
              <span>
                <span className="text-primary">$</span> stream:{" "}
                <TrackedLink
                  id="grants-stream-contract"
                  href={explorerAddressUrl(builder.streamAddress, 1)}
                  className="text-base-content hover:text-primary transition-colors"
                >
                  {shortAddress(builder.streamAddress)} ↗
                </TrackedLink>
              </span>
            )}
          </div>
        </header>
      </div>

      <div className="bg-skin">
        <div className="w-full max-w-[860px] mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-8">
          <section className="bg-white rounded-2xl shadow-md px-5 sm:px-10 py-8 sm:py-10">
            <div className="grid grid-cols-3 gap-4">
              <StatCard value={`${formatEth(builder.totalWithdrawn, 2)} Ξ`} label="withdrawn" />
              <StatCard value={String(builder.withdrawalCount)} label="withdrawals" />
              <StatCard value={builder.cap ? `${formatEth(builder.cap, 2)} Ξ` : "—"} label="monthly cap" />
            </div>

            <h2 className="text-xl sm:text-2xl mt-10 mb-2">Work log</h2>
            <p className="text-sm text-base-content/60 mt-0 mb-6">
              What {label} wrote when withdrawing from the stream, newest first.
            </p>
            <WithdrawalLog withdrawals={withdrawals} chainId={1} showBuilder={false} />
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getStreamAddresses().map(address => ({ params: { address } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const data = getStreamBuilder(params?.address as string);
  if (!data) return { notFound: true };
  return { props: data };
};

export default StreamPage;
