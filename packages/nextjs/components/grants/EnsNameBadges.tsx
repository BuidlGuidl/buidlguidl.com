import TrackedLink from "~~/components/TrackedLink";
import { explorerTxUrl, formatDate } from "~~/utils/grants/explorer";
import { EnsSponsorship } from "~~/utils/grants/types";

export const EnsNameBadges = ({ sponsorships }: { sponsorships: EnsSponsorship[] }) => (
  <div className="flex flex-wrap gap-2">
    {sponsorships.map(sponsorship => (
      <div
        key={sponsorship.registrationTx + sponsorship.name}
        className="tooltip [--tooltip-color:#212638] [--tooltip-text-color:#EBECFD]"
        data-tip={`Registered ${formatDate(sponsorship.registeredAt)}`}
      >
        <TrackedLink
          id="grants-ens-name"
          href={explorerTxUrl(sponsorship.registrationTx, 1)}
          className="inline-block font-mono text-xs px-3 py-1 border border-base-content/15 rounded-full hover:border-primary hover:text-primary transition-colors"
        >
          {sponsorship.name}
        </TrackedLink>
      </div>
    ))}
  </div>
);
