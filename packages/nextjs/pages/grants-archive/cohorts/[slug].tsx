import Link from "next/link";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { StatCard } from "~~/components/2025/StatCard";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { JsonLd } from "~~/components/JsonLd";
import { MetaHeader } from "~~/components/MetaHeader";
import TrackedLink from "~~/components/TrackedLink";
import { BuilderCell } from "~~/components/grants/BuilderCell";
import { ChainBadge } from "~~/components/grants/ChainBadge";
import { WithdrawalLog } from "~~/components/grants/WithdrawalLog";
import { getCohort, getCohortSlugs } from "~~/services/grants";
import { explorerAddressUrl, formatEth, formatMonth, shortAddress } from "~~/utils/grants/explorer";
import { CohortBuilder, CohortSummary, Withdrawal } from "~~/utils/grants/types";
import { cohortSchema } from "~~/utils/seo";

interface PageProps {
  cohort: CohortSummary;
  builders: CohortBuilder[];
  withdrawals: Withdrawal[];
}

const CohortPage: NextPage<PageProps> = ({ cohort, builders, withdrawals }) => {
  const activeRange =
    cohort.firstWithdrawalAt && cohort.lastWithdrawalAt
      ? `${formatMonth(cohort.firstWithdrawalAt)} – ${formatMonth(cohort.lastWithdrawalAt)}`
      : null;

  return (
    <>
      <MetaHeader
        title={`${cohort.name} cohort - BuidlGuidl Grants Archive`}
        description={`${cohort.name}: ${cohort.builderCount} builders, ${formatEth(
          cohort.totalWithdrawn,
          2,
        )} ETH streamed across ${cohort.withdrawalCount} withdrawals, with the work each builder logged.`}
        image={`api/og?title=${encodeURIComponent(`${cohort.name} cohort`)}`}
        path={`/grants-archive/cohorts/${cohort.slug}`}
      >
        <meta name="robots" content="noindex,follow" />
        <meta name="googlebot" content="noindex,follow" />
        <JsonLd data={cohortSchema(cohort)} />
      </MetaHeader>

      <div className="hero-fade">
        <Header transparent />
        <header className="w-full max-w-[860px] mx-auto px-5 sm:px-6 pt-4 pb-10 sm:pt-8 sm:pb-14">
          <Link
            href="/grants-archive"
            className="inline-block font-mono text-xs text-base-content/50 hover:text-primary transition-colors mb-4"
          >
            ← Grants archive
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h1 className="text-3xl sm:text-[2.5rem] sm:leading-[1.15] m-0">{cohort.name}</h1>
            <ChainBadge chainId={cohort.chainId} />
          </div>
          {cohort.blurb && (
            <p className="text-base sm:text-lg text-base-content/70 leading-relaxed mt-0 mb-4">{cohort.blurb}</p>
          )}

          <div className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-base-content/60">
            {activeRange && (
              <span>
                <span className="text-primary">$</span> active: <span className="text-base-content">{activeRange}</span>
              </span>
            )}
            <span>
              <span className="text-primary">$</span> contract:{" "}
              <TrackedLink
                id="grants-cohort-contract"
                href={explorerAddressUrl(cohort.address, cohort.chainId)}
                className="text-base-content hover:text-primary transition-colors"
              >
                {shortAddress(cohort.address)} ↗
              </TrackedLink>
            </span>
            {cohort.subdomain && (
              <span>
                <span className="text-primary">$</span> was at:{" "}
                <span className="text-base-content">{cohort.subdomain}</span>
              </span>
            )}
          </div>
        </header>
      </div>

      <div className="bg-skin">
        <div className="w-full max-w-[860px] mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-8">
          <section className="bg-white rounded-2xl shadow-md px-5 sm:px-10 py-8 sm:py-10">
            <div className="grid grid-cols-3 gap-4">
              <StatCard value={String(cohort.builderCount)} label="builders" />
              <StatCard value={`${formatEth(cohort.totalWithdrawn, 2)} Ξ`} label="streamed" />
              <StatCard value={String(cohort.withdrawalCount)} label="withdrawals" />
            </div>

            <h2 className="text-xl sm:text-2xl mt-10 mb-4">Builders</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left border-b border-base-content/10">
                    <th className="py-2 pr-4 font-medium">Builder</th>
                    <th className="py-2 pr-4 font-medium text-right">Monthly cap</th>
                    <th className="py-2 pr-4 font-medium text-right">Withdrawals</th>
                    <th className="py-2 font-medium text-right">Withdrawn</th>
                  </tr>
                </thead>
                <tbody>
                  {builders.map(builder => (
                    <tr key={builder.address} className="border-b border-base-content/5 last:border-none">
                      <td className="py-3 pr-4">
                        <BuilderCell address={builder.address} ens={builder.ens} chainId={cohort.chainId} />
                        {builder.removed && (
                          <span className="ml-2 font-mono text-[10px] text-base-content/40 uppercase">past</span>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-right tabular-nums whitespace-nowrap">
                        {builder.cap ? `${formatEth(builder.cap, 2)} Ξ` : "—"}
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
          </section>

          <section className="bg-white rounded-2xl shadow-md px-5 sm:px-10 py-8 sm:py-10">
            <h2 className="text-xl sm:text-2xl mt-0 mb-2">Work log</h2>
            <p className="text-sm text-base-content/60 mt-0 mb-6">
              What each builder wrote when withdrawing from the stream, newest first.
            </p>
            <WithdrawalLog withdrawals={withdrawals} chainId={cohort.chainId} />
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getCohortSlugs().map(slug => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const data = getCohort(params?.slug as string);
  if (!data) return { notFound: true };
  return { props: data };
};

export default CohortPage;
