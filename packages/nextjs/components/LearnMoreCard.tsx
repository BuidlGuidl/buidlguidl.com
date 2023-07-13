import Image from "next/image";

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
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col lg:w-[30%] max-w-xs shadow-lg bg-white rounded-[42px] p-5 mt-4 hover:opacity-80 transition-opacity"
    >
      <div className="flex w-full h-[200px] relative">
        <Image src={src} fill alt={name} className="w-full object-contain" />
      </div>
      <div className="mb-4">
        <h3 className="text-lg m-0 mb-2">{name}</h3>
        <p className="text-gray-700 m-0 text-sm">{description}</p>
      </div>
    </a>
  );
};
