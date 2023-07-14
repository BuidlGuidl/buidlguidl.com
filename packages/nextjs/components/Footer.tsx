import Image from "next/image";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <div className="bg-[#182232] md:p-12 p-4">
      <div className="grid grid-cols-12 md:gap-8 gap-3 border-b border-white pb-10">
        <div className="col-span-12 md:col-span-6 flex flex-col">
          <div className="flex flex-col">
            <Image src="/assets/logo-white.svg" alt="BuidlGuidl logo" width={150} height={150} />
            <p className="text-white md:w-1/2">
              The Web3 community of developers and designers where you can learn while creating cool prototypes and
              products along the way.
            </p>
          </div>
        </div>
        <div className="flex flex-col text-white space-y-2 col-span-4 md:col-span-2 font-thin">
          <p className="m-0 text-base-100">BuidlGuidl</p>
          <a href="https://app.buidlguidl.com/builds" target="_blank" rel="noreferrer" className="m-0">
            Builds
          </a>
          {/* <a href="https://app.buidlguidl.com/builds" target="_blank" rel="noreferrer" className="m-0"> */}
          {/*   community */}
          {/* </a> */}
          {/* <a href="https://app.buidlguidl.com/builds" target="_blank" rel="noreferrer" className="m-0">About</a> */}
          <a href="https://github.com/scaffold-eth/scaffold-eth-2" target="_blank" rel="noreferrer" className="m-0">
            Scaffold-ETH 2
          </a>
          <a href="https://speedrunethereum.com/" target="_blank" rel="noreferrer" className="m-0">
            Speedrun Ethereum
          </a>
        </div>
        <div className="flex flex-col text-white space-y-2 col-span-4 md:col-span-2 font-thin">
          <p className="m-0 text-base-100">Resources</p>
          <a
            href="https://www.youtube.com/watch?v=4hl61AmEGwU&list=PLJz1HruEnenD77QAsqnk7KG8rSOMk0B99"
            target="_blank"
            rel="noreferrer"
            className="m-0"
          >
            BG Labs
          </a>
          <a href="https://buidlguidl.substack.com/" target="_blank" rel="noreferrer" className="m-0">
            Shipping Logs
          </a>
          <a href="https://miro.com/app/board/uXjVPbc4b68=/" target="_blank" rel="noreferrer" className="m-0">
            Tech Tree
          </a>
        </div>
        <div className="flex flex-col text-white space-y-2 col-span-4 md:col-span-2 font-thin">
          <p className="m-0 text-base-100">Social</p>
          <a href="https://twitter.com/buidlguidl" target="_blank" rel="noreferrer" className="m-0">
            Twitter
          </a>
          <a href="https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA" target="_blank" rel="noreferrer" className="m-0">
            Telegram
          </a>
          <a href="https://discord.gg/pRsr6rwG" target="_blank" rel="noreferrer" className="m-0">
            Discord
          </a>
        </div>
      </div>
    </div>
  );
};
