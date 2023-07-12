import Image from "next/image";

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
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="card card-compact max-w-xs bg-white shadow-xl rounded-[37px]"
    >
      <div className="w-full h-[174px] relative">
        <Image src={src} alt="Shoes" fill className="w-full object-center" />
      </div>
      <div className="card-body gap-0">
        <h3 className="card-title m-0">{name}</h3>
        <p className="m-0">{description}</p>
      </div>
    </a>
  );
};
