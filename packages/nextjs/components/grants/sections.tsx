import { ReactNode } from "react";
import type { Screenshot } from "~~/components/grants/ScreenshotStrip";

export interface ArchiveSectionCopy {
  id: string;
  track: string;
  title: string;
  navTitle: string;
  intro: ReactNode;
  shots?: Screenshot[];
}

// Prose lives here rather than inline in the page, matching how the 2025 recap is organised.
export const ARCHIVE_SECTIONS: ArchiveSectionCopy[] = [
  {
    id: "streams",
    track: "builder streams",
    title: "Builder Streams",
    navTitle: "Streams",
    intro: (
      <p className="my-0">
        BuidlGuidl first funded builders using ETH issued through individualized smart contract streams. Devs pulled
        from their streams after submitting work that furthered the ecosystem.
      </p>
    ),
    shots: [
      {
        // v2 is gone and unachievable — the Wayback captures kept the HTML shell but not the
        // app bundle, so they replay blank. These two are a local run of the archived repo,
        // reading the same stream contracts off mainnet that it always did.
        src: "/grants/app-v2-home.webp",
        alt: "BuidlGuidl v2.2: the Builds tab listing what builders shipped, each with a screenshot and a Fund button",
        caption: "v2 · builds",
        sourceUrl: "https://github.com/scaffold-eth/buidlguidl.com",
      },
      {
        src: "/grants/app-v2-builders.webp",
        alt: "BuidlGuidl v2.2: the Builders tab, one row per builder with their own stream, its cap and refill progress",
        caption: "v2 · builders",
        sourceUrl: "https://github.com/scaffold-eth/buidlguidl.com",
      },
      {
        src: "/grants/app-v3-home.webp",
        alt: "BuidlGuidl v3 home page with the castle drawing and counts of builders, builds and ETH streamed",
        caption: "v3 · home",
        sourceUrl: "https://v3.buidlguidl.com/",
      },
      {
        src: "/grants/app-v3-builder.webp",
        alt: "A v3 builder profile showing the stream rate, balance and unlocked amount above the builder's builds",
        caption: "v3 · builder profile",
        sourceUrl: "https://v3.buidlguidl.com/builders",
      },
      {
        src: "/grants/app-v3-build.webp",
        alt: "The v3 page for the SpeedRunEthereum.com build: its cover art, description, likes and the builder who submitted it",
        caption: "v3 · build",
        sourceUrl: "https://v3.buidlguidl.com/build/S85zap8MoW9m12G1Cy4n",
      },
      {
        src: "/grants/app-v35-home.webp",
        alt: "BuidlGuidl app v3.5 home page with the illustrated landscape and headline stats",
        caption: "app v3.5 · home",
        sourceUrl: "https://app.buidlguidl.com/",
      },
      {
        src: "/grants/app-v35-builders.webp",
        alt: "The v3.5 builders directory: a table of builders with their status, builds and cohort",
        caption: "app v3.5 · builders",
        sourceUrl: "https://app.buidlguidl.com/builders",
      },
      {
        src: "/grants/app-v35-activity.webp",
        alt: "The v3.5 activity feed listing builds submitted, edited and liked by builders",
        caption: "app v3.5 · activity",
        sourceUrl: "https://app.buidlguidl.com/activity",
      },
    ],
  },
  {
    id: "cohorts",
    track: "cohort streams",
    title: "Cohorts",
    navTitle: "Cohorts",
    intro: (
      <p className="my-0">
        BuidlGuidl dev funding evolved into a cohort system. Builders were organized into groups working on common
        topics like ZK, node infrastructure, onchain games, media, and many more. The group-oriented approach allowed
        for greater collaboration and more polished results.
      </p>
    ),
    shots: [
      {
        // The live site is now BG Sand Garden, which is no longer a cohort, so this is the
        // 2023 Wayback capture of the cohort site instead.
        src: "/grants/cohort-sandgarden.webp",
        alt: "Sand Garden cohort site in 2023: green terminal-style page funding a monthly UBI to handpicked open-source developers",
        caption: "sandgarden · 2023",
        sourceUrl: "https://web.archive.org/web/20230629155037/https://sandgarden.buidlguidl.com/",
      },
      {
        src: "/grants/cohort-hackerhouse.webp",
        alt: "Jessy's Hacker House site: the Denver Hacker House Crew stream with a video update from the hackers",
        caption: "hackerhouse.buidlguidl.com",
        sourceUrl: "https://hackerhouse.buidlguidl.com/",
      },
      {
        src: "/grants/cohort-sanctum.webp",
        alt: "Sanctum cohort site with its illustrated hall, “a quiet place for special BuidlGuidl builders”",
        caption: "sanctum.buidlguidl.com",
        sourceUrl: "https://sanctum.buidlguidl.com/",
      },
      {
        src: "/grants/cohort-outreach.webp",
        alt: "BG Outreach cohort site describing its monthly ETH reward for community builders",
        caption: "outreach.buidlguidl.com",
        sourceUrl: "https://outreach.buidlguidl.com/",
      },
      {
        src: "/grants/cohort-play-full.webp",
        alt: "Play Full cohort site, run with Kernel and RADAR, funding playful open-source futures",
        caption: "play-full.buidlguidl.com",
        sourceUrl: "https://play-full.buidlguidl.com/",
      },
      {
        src: "/grants/cohort-media.webp",
        alt: "BG Media cohort site: teal page funding design, social media and media work",
        caption: "media.buidlguidl.com",
        sourceUrl: "https://media.buidlguidl.com/",
      },
      {
        src: "/grants/cohort-autoworld.webp",
        alt: "Autonomous Worlds site under Jessy's Hacker House, listing its builder streams",
        caption: "autoworld-streams.buidlguidl.com",
        sourceUrl: "https://autoworld-streams.buidlguidl.com/",
      },
      {
        src: "/grants/cohort-ens.webp",
        alt: "ENS cohort site with its illustrated card, rewarding devs building on ENS",
        caption: "ens.buidlguidl.com",
        sourceUrl: "https://ens.buidlguidl.com/",
      },
      {
        src: "/grants/cohort-launchpod.webp",
        alt: "LaunchPod cohort site explaining monthly streams to open-source Ethereum developers",
        caption: "launchpod.buidlguidl.com",
        sourceUrl: "https://launchpod.buidlguidl.com/",
      },
      {
        src: "/grants/cohort-balancer.webp",
        alt: "Balancer cohort site with its illustrated card, rewarding devs building on Balancer",
        caption: "balancer.buidlguidl.com",
        sourceUrl: "https://balancer.buidlguidl.com/",
      },
    ],
  },
  {
    id: "grants",
    track: "grant program",
    title: "Grants",
    navTitle: "Grants",
    intro: (
      <p className="my-0">
        BuidlGuidl Grants connected builders with ecosystem members in need of public goods. Ecosystem Impact Grants
        were a subset of high-impact grants that funded the development of larger-scale projects.
      </p>
    ),
    shots: [
      {
        src: "/grants/grants-home.webp",
        alt: "BG Grants home page: “Funding meaningful projects across the Ethereum ecosystem” with grant totals",
        caption: "grants.buidlguidl.com",
        sourceUrl: "https://grants.buidlguidl.com/",
      },
      {
        src: "/grants/grants-ecosystem.webp",
        alt: "The ecosystem impact grants section of the grants site: cards for Jessy's Hacker House, Solidity By Example, W1nt3r and others with the ETH each received",
        caption: "grants · ecosystem impact",
        sourceUrl: "https://grants.buidlguidl.com/",
      },
      {
        src: "/grants/grants-community.webp",
        alt: "The BuidlGuidl Community Grants section explaining who could apply, the process, the 50/50 payment and the 0.08 ETH starting amount",
        caption: "grants · community grants",
        sourceUrl: "https://grants.buidlguidl.com/",
      },
      {
        src: "/grants/grants-completed.webp",
        alt: "The completed grants page listing finished grants with their amounts and builders",
        caption: "grants · completed",
        sourceUrl: "https://grants.buidlguidl.com/completed-grants",
      },
    ],
  },
  {
    id: "ens",
    track: "ens sponsorships",
    title: "ENS names",
    navTitle: "ENS names",
    intro: (
      <p className="my-0">
        Registering an ENS identity is a fundamental onboarding step. BuidlGuidl funded ENS registration fees for
        hundreds of new devs.
      </p>
    ),
  },
];

export const ARCHIVE_NAV = ARCHIVE_SECTIONS.map(({ id, navTitle }) => ({ id, title: navTitle }));
