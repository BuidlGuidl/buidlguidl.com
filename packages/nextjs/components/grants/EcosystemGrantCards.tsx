import TrackedLink from "~~/components/TrackedLink";
import { formatEth } from "~~/utils/grants/explorer";
import { EcosystemGrant } from "~~/utils/grants/types";

export const EcosystemGrantCards = ({ grants }: { grants: EcosystemGrant[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {grants.map(grant => (
      <div key={grant.name} className="border border-base-content/10 rounded-xl p-4 flex flex-col">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-base m-0">{grant.name}</h3>
          <span className="font-mono text-xs text-base-content/60 whitespace-nowrap">
            {formatEth(grant.amount, 2)} ETH
          </span>
        </div>
        <p className="mt-2 mb-0 text-sm text-base-content/70 leading-relaxed flex-1">{grant.description}</p>
        {grant.xLink && (
          <TrackedLink
            id="grants-ecosystem-x"
            href={grant.xLink}
            className="mt-3 font-mono text-xs text-primary hover:underline"
          >
            → X
          </TrackedLink>
        )}
      </div>
    ))}
  </div>
);
