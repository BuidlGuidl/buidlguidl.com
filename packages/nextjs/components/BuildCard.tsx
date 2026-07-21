import Image from "next/image";
import TrackedLink from "~~/components/TrackedLink";

export const BuildCard = ({
  name,
  description,
  src,
  link,
  metrics,
}: {
  name: string;
  description: string;
  src: string;
  link: string;
  metrics?: { value: string; label: string }[];
}) => {
  return (
    <TrackedLink
      id={name}
      href={link}
      className="w-full card card-compact lg:w-1/3 max-w-xs bg-white shadow-lg rounded-xl overflow-hidden"
    >
      <div className="w-full h-[220px] relative">
        <Image src={src} alt={name} fill className="w-full object-center object-cover" />
      </div>
      <div className="card-body gap-0 border-t border-primary bg-white">
        <h3 className="card-title m-0">{name}</h3>
        <p className="m-0">{description}</p>
        {metrics && (
          <div className="flex flex-wrap gap-2 mt-4">
            {metrics.map(metric => (
              <div
                key={metric.label}
                className="bg-accent/10 border border-accent/40 text-accent rounded-full px-2.5 py-1 text-xs whitespace-nowrap"
              >
                <span className="font-bold">{metric.value}</span> {metric.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </TrackedLink>
  );
};
