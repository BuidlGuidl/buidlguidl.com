import { ReactNode } from "react";
import { StatCard } from "~~/components/2025/StatCard";

export interface ArchiveStat {
  value: string;
  label: string;
  growth?: string;
}

// Written out in full so Tailwind's scanner sees each class literally.
const COLUMNS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

interface ArchiveSectionProps {
  id: string;
  track: string;
  title: string;
  intro: ReactNode;
  stats?: ArchiveStat[];
  children: ReactNode;
}

// White card section: track label + title + intro + stats + content.
// Mirrors the 2025 recap's RecapSection; kept separate so that dated page stays free to change.
export const ArchiveSection = ({ id, track, title, intro, stats, children }: ArchiveSectionProps) => (
  <section id={id} className="bg-white rounded-2xl shadow-md px-5 sm:px-10 py-8 sm:py-10 scroll-mt-8">
    <div className="flex items-center gap-4 mb-5">
      <span className="font-mono text-[10px] text-base-content/40 uppercase tracking-[0.2em]">{track}</span>
      <span className="flex-1 max-w-[12rem] h-px bg-base-content/10" />
    </div>

    <h2 className="text-2xl sm:text-3xl mt-0 mb-4">{title}</h2>

    <div className="text-base-content/70 leading-relaxed mt-0 mb-8">{intro}</div>

    {stats && stats.length > 0 && (
      <div className={`grid grid-cols-2 gap-4 mb-8 ${COLUMNS[stats.length] ?? "sm:grid-cols-4"}`}>
        {stats.map(stat => (
          <StatCard key={stat.value + stat.label} {...stat} />
        ))}
      </div>
    )}

    {children}
  </section>
);
