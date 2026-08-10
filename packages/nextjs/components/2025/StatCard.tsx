interface StatCardProps {
  value: string;
  label: string;
  growth?: string;
}

export const StatCard = ({ value, label, growth }: StatCardProps) => (
  <div className="border border-base-content/10 rounded-xl px-4 py-5 flex flex-col items-center text-center">
    <span className="text-2xl sm:text-3xl font-bold tracking-tight">{value}</span>
    {growth && <span className="font-mono text-xs text-base-content/70 mt-1.5">{growth}</span>}
    {label && <span className="font-mono text-xs text-base-content/50 mt-1">{label}</span>}
  </div>
);
