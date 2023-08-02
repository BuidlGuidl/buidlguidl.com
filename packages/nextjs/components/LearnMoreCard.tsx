import Image from "next/image";
import TrackedLink from "~~/components/TrackedLink";

export const LearnMoreCard = ({
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
      className="flex flex-col lg:w-[30%] max-w-xs shadow-lg bg-white rounded-[42px] p-5 mt-4"
    >
      <div className="w-full h-[220px] relative mb-4">
        <Image src={src} alt={name} fill className="w-full object-center object-cover" />
      </div>
      <div className="mb-4">
        <h3 className="text-lg m-0 mb-2">{name}</h3>
        <p className="text-gray-700 m-0 text-sm">{description}</p>
      </div>
    </TrackedLink>
  );
};
