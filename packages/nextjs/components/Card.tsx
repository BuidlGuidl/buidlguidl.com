import Image from "next/image";

/**
 * Site header
 */
export const Card = ({
  num,
  name,
  description,
  src,
}: {
  num: number;
  name: string;
  description: string;
  src: string;
}) => {
  return (
    <div className="max-w-xs shadow-lg bg-white rounded-[46px] px-6 py-8 mt-4">
      <div className="flex w-full h-[150px] relative">
        <Image src={src} fill alt="Dex Challenge" className="w-full object-contain" />
      </div>
      <div className="mb-4">
        <span className="font-thin text-xs">Challenge #{num}</span>
        <p className="font-bold text-lg m-0 mb-2">{name}</p>
        <p className="text-gray-700 m-0 text-sm">{description}</p>
      </div>
      <a
        href="https://speedrunethereum.com/"
        target="_blank"
        rel="noreferrer"
        className="btn btn-accent btn-sm md:self-start rounded-3xl"
      >
        Fork the Repo
      </a>
    </div>
  );
};
