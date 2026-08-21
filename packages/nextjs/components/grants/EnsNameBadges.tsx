import TrackedLink from "~~/components/TrackedLink";
import { explorerTxUrl, formatDate } from "~~/utils/grants/explorer";
import { EnsNameBadge } from "~~/utils/grants/types";

export const EnsNameBadges = ({ names }: { names: EnsNameBadge[] }) => (
  <div className="flex flex-wrap gap-2">
    {names.map(badge => (
      <div
        key={badge.registrationTx + badge.name}
        className="tooltip [--tooltip-color:#212638] [--tooltip-text-color:#EBECFD]"
        data-tip={`Registered ${formatDate(badge.registeredAt)}`}
      >
        <TrackedLink
          id="grants-ens-name"
          href={explorerTxUrl(badge.registrationTx, 1)}
          className="inline-block font-mono text-xs px-3 py-1 border border-base-content/15 rounded-full hover:bg-base-200/40 transition-colors"
        >
          {badge.name}
        </TrackedLink>
      </div>
    ))}
  </div>
);
