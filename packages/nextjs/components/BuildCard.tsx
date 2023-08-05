import Image from "next/image";
import TrackedLink from "~~/components/TrackedLink";

export const BuildCard = ({
  name,
  description,
  src,
  link,
}: {
  name: string;
  description: string;
  src: string;
  link: string;
}) => {
  return (
    <TrackedLink
      id={name}
      href={link}
      className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-1000 card-anchor card card-compact lg:w-1/3 max-w-xs bg-white shadow-lg rounded-[46px]"
    >
      <div className="w-full h-[220px] relative">
        <Image src={src} alt={name} fill className="w-full object-center object-cover" />
      </div>
      <div className="card-body gap-0 border-t">
        <h3 className="card-title m-0">{name}</h3>
        <p className="m-0">{description}</p>
      </div>
    </TrackedLink>
  );
};
