import Image from "next/image";
import TrackedLink from "~~/components/TrackedLink";

/**
 * Site header
 */
export const Card = ({
  num,
  name,
  description,
  src,
  link,
}: {
  num: number;
  name: string;
  description: string;
  src: string;
  link: string;
}) => {
  return (
    <div className="transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-1000 flex flex-col lg:w-1/3 max-w-xs shadow-lg bg-white rounded-[46px] p-5 py-8 mt-4">
      <div className="flex w-full h-[150px] relative">
        <Image src={src} fill alt="Dex Challenge" className="w-full object-contain" />
      </div>
      <div className="mb-4">
        <span className="font-thin text-xs">Challenge #{num}</span>
        <h3 className="text-lg m-0 mb-2">{name}</h3>
        <p className="text-gray-700 m-0 text-sm">{description}</p>
      </div>
      <TrackedLink id={name} href={link} className="btn btn-accent btn-sm md:self-start rounded-3xl mt-auto">
        Fork the Repo
      </TrackedLink>
    </div>
  );
};
