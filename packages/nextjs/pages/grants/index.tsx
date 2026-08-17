import type { GetStaticProps, NextPage } from "next";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { JsonLd } from "~~/components/JsonLd";
import { MetaHeader } from "~~/components/MetaHeader";
import { ArchiveSection } from "~~/components/grants/ArchiveSection";
import { CohortTable } from "~~/components/grants/CohortTable";
import { EcosystemGrantCards } from "~~/components/grants/EcosystemGrantCards";
import { EnsNameBadges } from "~~/components/grants/EnsNameBadges";
import { GrantsTable } from "~~/components/grants/GrantsTable";
import { SectionNav } from "~~/components/grants/SectionNav";
import { StreamBuildersTable } from "~~/components/grants/StreamBuildersTable";
import { ARCHIVE_NAV, ARCHIVE_SECTIONS } from "~~/components/grants/sections";
import {
  getCohorts,
  getEcosystemGrants,
  getEnsSponsorships,
  getGrantsMeta,
  getProgramGrants,
  getStreamBuilders,
} from "~~/services/grants";
import { formatEth } from "~~/utils/grants/explorer";
import {
  CohortSummary,
  EcosystemGrant,
  EnsSponsorshipsData,
  GrantsSnapshotMeta,
  ProgramGrantsData,
  StreamBuilder,
} from "~~/utils/grants/types";
import { grantsArchiveSchema } from "~~/utils/seo";

interface PageProps {
  meta: GrantsSnapshotMeta;
  cohorts: CohortSummary[];
  grants: ProgramGrantsData;
  ecosystem: EcosystemGrant[];
  streamBuilders: StreamBuilder[];
  ens: EnsSponsorshipsData;
}

const number = (value: number) => value.toLocaleString("en-US");

const GrantsArchive: NextPage<PageProps> = ({ meta, cohorts, grants, ecosystem, streamBuilders, ens }) => {
  const t = meta.totals;
  // Positional, so this must stay in step with the order of ARCHIVE_SECTIONS.
  const [cohortsCopy, streamsCopy, grantsCopy, ensCopy] = ARCHIVE_SECTIONS;

  const heroStats = [
    { label: "eth_funded", value: formatEth(t.cohortEthStreamed + t.streamEthWithdrawn + t.grantsEth, 0) },
    { label: "builders_funded", value: number(t.uniqueBuilders) },
    { label: "work_logs", value: number(t.cohortWithdrawals + t.streamWithdrawals) },
    { label: "ens_names", value: number(ens.stats.names) },
  ];

  return (
    <>
      <MetaHeader
        title="Grants & Cohorts Archive - BuidlGuidl"
        description="Every grant, cohort, and builder stream BuidlGuidl funded, with the builders' own work logs, and the ENS names it paid for. An archive of the cohort subdomains, the grants program, and the app streams."
        image={`api/og?title=${encodeURIComponent("Grants Archive")}`}
        path="/grants"
      >
        <JsonLd data={grantsArchiveSchema} />
      </MetaHeader>

      {/* Title band, hero-style fade behind the header */}
      <div className="hero-fade">
        <Header transparent />
        <header className="w-full max-w-[860px] mx-auto px-5 sm:px-6 pt-4 pb-10 sm:pt-8 sm:pb-14">
          <h1 className="text-3xl sm:text-[2.5rem] sm:leading-[1.15] mb-4">Grants given by BuidlGuidl</h1>
          <p className="text-base sm:text-lg text-base-content/70 leading-relaxed m-0">
            Over the years BuidlGuidl funded builders three ways: cohort streams, community and ecosystem grants, and
            personal streams on the BuidlGuidl app — and before any of them, by quietly paying for a lot of
            people&apos;s first ENS name. Those programs have ended and the sites that hosted them are being retired, so
            everything they recorded lives here — including what each builder wrote about the work they did.
          </p>

          {/* Stats line - terminal style */}
          <div className="flex flex-wrap gap-x-5 gap-y-1 mt-5 font-mono text-xs sm:text-sm text-base-content/60">
            {heroStats.map(stat => (
              <span key={stat.label}>
                <span className="text-primary">$</span> {stat.label}:{" "}
                <span className="text-base-content font-medium">{stat.value}</span>
              </span>
            ))}
          </div>

          {/* Section chips */}
          <div className="flex flex-wrap gap-2 mt-5">
            {ARCHIVE_NAV.map(section => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="px-3 py-1 font-mono text-xs text-base-content/50 border border-base-content/15 rounded-md hover:border-primary hover:text-base-content transition-colors"
              >
                /{section.id}
              </a>
            ))}
          </div>
        </header>
      </div>

      {/* Body: section nav sidebar + boxed sections */}
      <div className="bg-skin">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col xl:flex-row xl:justify-center items-stretch xl:items-start gap-8">
          <SectionNav sections={ARCHIVE_NAV} />
          <main className="w-full max-w-[860px] mx-auto xl:mx-0 flex flex-col gap-8">
            <ArchiveSection
              {...cohortsCopy}
              stats={[
                { value: String(t.cohorts), label: "cohorts" },
                { value: `${formatEth(t.cohortEthStreamed, 0)} Ξ`, label: "streamed" },
                { value: String(t.cohortBuilders), label: "builders" },
                { value: number(t.cohortWithdrawals), label: "work logs" },
              ]}
            >
              <CohortTable cohorts={cohorts} />
            </ArchiveSection>

            <ArchiveSection
              {...streamsCopy}
              stats={[
                { value: String(t.streamBuilders), label: "streamed to" },
                { value: `${formatEth(t.streamEthWithdrawn, 0)} Ξ`, label: "withdrawn" },
                { value: number(t.streamWithdrawals), label: "work logs" },
                { value: number(t.appBuilds), label: "builds shipped" },
              ]}
            >
              <StreamBuildersTable builders={streamBuilders} />
            </ArchiveSection>

            <ArchiveSection
              {...grantsCopy}
              stats={[
                { value: String(t.grants), label: "grants" },
                { value: `${formatEth(t.grantsEth, 0)} Ξ`, label: "granted" },
              ]}
            >
              <h3 className="text-lg mt-0 mb-4">Ecosystem impact grants</h3>
              <EcosystemGrantCards grants={ecosystem} />

              <h3 className="text-lg mt-8 mb-4">Community grants</h3>
              <GrantsTable grants={grants.grants} />
            </ArchiveSection>

            <ArchiveSection
              {...ensCopy}
              stats={[
                { value: String(ens.stats.names), label: "names" },
                { value: `${formatEth(ens.stats.ethSent, 1)} Ξ`, label: "sent" },
              ]}
            >
              <EnsNameBadges sponsorships={ens.sponsorships} />
            </ArchiveSection>
          </main>
          {/* Spacer to keep the sections centered next to the nav */}
          <div className="hidden xl:block w-52 shrink-0" />
        </div>
      </div>

      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => ({
  props: {
    meta: getGrantsMeta(),
    // Copied first: getCohorts() memoizes, and sorting in place would reorder the cache.
    cohorts: [...getCohorts()].sort((a, b) => b.totalWithdrawn - a.totalWithdrawn || a.name.localeCompare(b.name)),
    grants: getProgramGrants(),
    ecosystem: getEcosystemGrants(),
    streamBuilders: getStreamBuilders(),
    ens: getEnsSponsorships(),
  },
});

export default GrantsArchive;
