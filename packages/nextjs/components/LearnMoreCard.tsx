export const LearnMoreCard = ({ name, description, link }: { name: string; description: string; link: string }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col lg:w-[30%] max-w-xs shadow-lg bg-white rounded-[42px] p-5 mt-4"
    >
      <div className="mb-4">
        <h3 className="text-lg m-0 mb-2">{name}</h3>
        <p className="text-gray-700 m-0 text-sm">{description}</p>
      </div>
    </a>
  );
};
