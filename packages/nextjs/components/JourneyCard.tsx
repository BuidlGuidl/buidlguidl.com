import Image from "next/image";
import TrackedLink from "~~/components/TrackedLink";

/**
 * Site header
 */
export const Card = ({
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
      className="flex flex-col lg:w-1/3 max-w-xs shadow-lg bg-skin rounded-[46px] mt-4"
    >
      <div className="flex w-full h-[180px] relative">
        <Image src={src} fill alt="Dex Challenge" className="w-full object-cover rounded-t-[46px]" />
      </div>
      <div className="p-8 pt-6">
        <h3 className="text-lg m-0">{name}</h3>
        <p className="text-gray-700 m-0 pt-1 text-sm">{description}</p>
      </div>
    </TrackedLink>
  );
};
