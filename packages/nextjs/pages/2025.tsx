import type { NextPage } from "next";
import { RecapSection } from "~~/components/2025/RecapSection";
import { SectionNav } from "~~/components/2025/SectionNav";
import { TerminalWindow } from "~~/components/2025/TerminalWindow";
import { RECAP_SECTIONS } from "~~/components/2025/sections";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { MetaHeader } from "~~/components/MetaHeader";

const HERO_STATS = [
  { label: "sre_visitors", value: "92,400" },
  { label: "sre_signups", value: "5,700" },
  { label: "se2_repos", value: "2,243" },
];

const TRACK_CHIPS = [
  { href: "#speedrun", label: "education" },
  { href: "#scaffold-eth", label: "tooling" },
  { href: "#ecosystem", label: "collabs" },
  { href: "#node-infra", label: "infra" },
];

const Recap2025: NextPage = () => {
  return (
    <>
      <MetaHeader
        title="2025 Recap - BuidlGuidl"
        description="A look back at what BuidlGuidl shipped in 2025: Speedrun Ethereum, Scaffold-ETH 2, educational initiatives, and ecosystem collabs."
        image={`api/og?title=${encodeURIComponent("2025 Recap")}`}
        path="/2025"
      />

      {/* Title band, hero-style fade behind the header */}
      <div className="hero-fade">
        <Header transparent />
        <header className="w-full max-w-[860px] mx-auto px-5 sm:px-6 pt-4 pb-10 sm:pt-8 sm:pb-14">
          <h1 className="text-3xl sm:text-[2.5rem] sm:leading-[1.15] mb-4">2025 Recap</h1>
          <p className="text-base sm:text-lg text-base-content/70 leading-relaxed m-0">
            BuidlGuidl builds products, tools, and educational resources to onboard developers to Ethereum and help them
            grow in the ecosystem. In 2025, we shipped big upgrades to Speedrun Ethereum and Scaffold-ETH 2, helped run
            several educational initiatives, and partnered to build new tools with ENS, Arbitrum, and others.
          </p>

          {/* Stats line - terminal style */}
          <div className="flex flex-wrap gap-x-5 gap-y-1 mt-5 font-mono text-xs sm:text-sm text-base-content/60">
            {HERO_STATS.map(stat => (
              <span key={stat.label}>
                <span className="text-primary">$</span> {stat.label}:{" "}
                <span className="text-base-content font-medium">{stat.value}</span>
              </span>
            ))}
          </div>

          {/* Track chips */}
          <div className="flex flex-wrap gap-2 mt-5">
            {TRACK_CHIPS.map(track => (
              <a
                key={track.href}
                href={track.href}
                className="px-3 py-1 font-mono text-xs text-base-content/50 border border-base-content/15 rounded-md hover:border-primary hover:text-base-content transition-colors"
              >
                /{track.label}
              </a>
            ))}
          </div>
        </header>
      </div>

      {/* Body: section nav sidebar + boxed sections */}
      <div className="bg-skin">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col xl:flex-row xl:justify-center items-stretch xl:items-start gap-8">
          <SectionNav />
          <main className="w-full max-w-[860px] mx-auto xl:mx-0 flex flex-col gap-8">
            {RECAP_SECTIONS.map(section => (
              <RecapSection
                key={section.id}
                id={section.id}
                track={section.track}
                title={section.title}
                intro={section.intro}
                stats={section.stats}
              >
                <TerminalWindow tabs={section.tabs} />
              </RecapSection>
            ))}
          </main>
          {/* Spacer to keep the sections centered next to the nav */}
          <div className="hidden xl:block w-52 shrink-0" />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Recap2025;
