import Image from "next/image";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <div className="bg-[#182232] md:p-12 p-4">
      <div className="grid grid-cols-12 md:gap-8 gap-2 border-b border-white pb-8">
        <div className="col-span-12 md:col-span-6 flex flex-col">
          <div className="flex flex-col">
            <Image src="/assets/logoWhite.svg" alt="BuidlGuidl logo" width={150} height={150} />
            <p className="text-white md:w-1/2">
              The Web3 community of developers and designers where you can learn while creating cool prototypes and
              products along the way.
            </p>
          </div>
        </div>
        <div className="flex flex-col text-white space-y-2 col-span-4 md:col-span-2">
          <p className="m-0 underline">BuidlGuidl</p>
          <p className="m-0">Builds</p>
          <p className="m-0">community</p>
          <p className="m-0">About</p>
          <p className="m-0">Scaffold-ETH 2</p>
          <p className="m-0">Speedrun Ethereum</p>
        </div>
        <div className="flex flex-col text-white space-y-2 col-span-4 md:col-span-2">
          <p className="m-0 underline">Resources</p>
          <p className="m-0">BG Labs</p>
          <p className="m-0">Shipping Log</p>
          <p className="m-0">Tech Tree</p>
        </div>
        <div className="flex flex-col text-white space-y-2 col-span-4 md:col-span-2">
          <p className="m-0 underline">Social</p>
          <p className="m-0">Twitter</p>
          <p className="m-0">Discors</p>
          <p className="m-0">Telegram</p>
        </div>
      </div>
    </div>
  );
};
