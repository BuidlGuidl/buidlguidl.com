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
    id: "cohorts",
    track: "cohort streams",
    title: "Cohorts",
    navTitle: "Cohorts",
    intro: (
      <>
        <p className="mt-0">
          Each cohort was a group of builders funded to work on a common field: ENS tooling, zero-knowledge
          cryptography, security and gas optimization, node infrastructure, onchain games, media and outreach. A cohort
          got its own shared stream, and its builders drew from it as they shipped.
        </p>
        <p className="mb-0">
          Every withdrawal came with a note about the work it paid for. Those notes are kept here in full.
        </p>
      </>
    ),
    shots: [
      {
        src: "/grants/cohort-sandgarden.webp",
        alt: "Sand Garden cohort site: green terminal-style page listing featured projects and collaborators",
        caption: "sandgarden.buidlguidl.com",
        sourceUrl: "https://sandgarden.buidlguidl.com/",
      },
      {
        src: "/grants/cohort-sandgarden-members.webp",
        alt: "Sand Garden members page: each builder with their stream cap and unlocked balance",
        caption: "sandgarden · members",
        sourceUrl: "https://sandgarden.buidlguidl.com/members",
      },
      {
        src: "/grants/cohort-mercs.webp",
        alt: "Mercs cohort site: red terminal-style page with the cohort stream contract and owner",
        caption: "mercs.buidlguidl.com",
        sourceUrl: "https://mercs.buidlguidl.com/",
      },
      {
        src: "/grants/cohort-hackerhouse.webp",
        alt: "Jessy's Hacker House site: the Denver Hacker House Crew stream with a video update from the hackers",
        caption: "hackerhouse.buidlguidl.com",
        sourceUrl: "https://hackerhouse.buidlguidl.com/",
      },
      {
        src: "/grants/cohort-owners.webp",
        alt: "Project Owners cohort site: streams for owning projects or cohorts within the BuidlGuidl",
        caption: "owners.buidlguidl.com",
        sourceUrl: "https://owners.buidlguidl.com/",
      },
      {
        src: "/grants/cohort-sanctum.webp",
        alt: "Sanctum cohort site with its illustrated hall, “a quiet place for special BuidlGuidl builders”",
        caption: "sanctum.buidlguidl.com",
        sourceUrl: "https://sanctum.buidlguidl.com/",
      },
      {
        src: "/grants/cohort-nodes.webp",
        alt: "Nodes cohort site describing the BuidlGuidl node client work, with its stream contract",
        caption: "nodes.buidlguidl.com",
        sourceUrl: "https://nodes.buidlguidl.com/",
      },
      {
        src: "/grants/cohort-workshops.webp",
        alt: "Workshops cohort site funding SpeedRunEthereum and Scaffold-ETH demonstrations and hackathons",
        caption: "workshops.buidlguidl.com",
        sourceUrl: "https://workshops.buidlguidl.com/",
      },
      {
        src: "/grants/cohort-batches.webp",
        alt: "Batches cohort site funding work on the management and expansion of the BG Batches program",
        caption: "batches.buidlguidl.com",
        sourceUrl: "https://batches.buidlguidl.com/",
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
        src: "/grants/cohort-niftyink.webp",
        alt: "Nifty Ink cohort site funding the NiftyInk BuidlGuidl cohort with ETH streams",
        caption: "niftyink.buidlguidl.com",
        sourceUrl: "https://niftyink.buidlguidl.com/",
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
        src: "/grants/cohort-shipyard.webp",
        alt: "BG Ship Yard site funding focused, high-leverage open-source work",
        caption: "shipyard.buidlguidl.com",
        sourceUrl: "https://shipyard.buidlguidl.com/",
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
    id: "streams",
    track: "builder streams",
    title: "BuidlGuidl app streams",
    navTitle: "App streams",
    intro: (
      <>
        <p className="mt-0">
          Before cohorts, BuidlGuidl streamed to builders individually through personal stream contracts on{" "}
          <span className="font-mono text-[0.9em]">app.buidlguidl.com</span>. Each withdrawal carried the same kind of
          work log a cohort withdrawal does.
        </p>
        <p className="mb-0">
          These are the builders who withdrew from a personal stream, and everything they wrote down while doing it.
        </p>
      </>
    ),
    shots: [
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
    id: "grants",
    track: "grant program",
    title: "Grants",
    navTitle: "Grants",
    intro: (
      <p className="my-0">
        Community grants funded BuidlGuidl members to build something that contributes to the Ethereum ecosystem.
        Ecosystem impact grants funded a handful of people and projects at a larger scale.
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
        src: "/grants/grants-active.webp",
        alt: "The active grants page: cards showing each grant's amount, builder and proposal",
        caption: "grants · active",
        sourceUrl: "https://grants.buidlguidl.com/active-grants",
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
        The smallest thing BuidlGuidl funded, and the one that came first. Austin would send a developer just enough ETH
        to register their first ENS name, and they would register it — usually within the hour. From late 2022 it ran
        through a contract behind <span className="font-mono text-[0.9em]">scholarship.buidlguidl.com</span>, so it no
        longer had to be him doing the sending.
      </p>
    ),
  },
];

export const ARCHIVE_NAV = ARCHIVE_SECTIONS.map(({ id, navTitle }) => ({ id, title: navTitle }));
