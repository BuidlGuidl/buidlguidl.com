import { ReactNode } from "react";

export interface ArchiveSectionCopy {
  id: string;
  track: string;
  title: string;
  navTitle: string;
  intro: ReactNode;
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
  },
];

export const ARCHIVE_NAV = ARCHIVE_SECTIONS.map(({ id, navTitle }) => ({ id, title: navTitle }));
