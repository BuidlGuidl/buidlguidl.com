import { ReactNode } from "react";
import { StatCard } from "./StatCard";

export interface RecapStat {
  value: string;
  label: string;
  growth?: string;
}

interface RecapSectionProps {
  id: string;
  track: string;
  title: string;
  intro: ReactNode;
  stats?: RecapStat[];
  children: ReactNode;
}

// White card section: track label + title + intro + stats + content, stacked vertically
export const RecapSection = ({ id, track, title, intro, stats, children }: RecapSectionProps) => (
  <section id={id} className="bg-white rounded-2xl shadow-md px-5 sm:px-10 py-8 sm:py-10 scroll-mt-8">
    <div className="flex items-center gap-4 mb-5">
      <span className="font-mono text-[10px] text-base-content/40 uppercase tracking-[0.2em]">{track}</span>
      <span className="flex-1 max-w-[12rem] h-px bg-base-content/10" />
    </div>

    <h2 className="text-2xl sm:text-3xl mt-0 mb-4">{title}</h2>

    <p className="text-base-content/70 leading-relaxed mt-0 mb-8">{intro}</p>

    {stats && stats.length > 0 && (
      <div className={`grid grid-cols-1 gap-4 mb-8 ${stats.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {stats.map(stat => (
          <StatCard key={stat.value + stat.label} {...stat} />
        ))}
      </div>
    )}

    {children}
  </section>
);
