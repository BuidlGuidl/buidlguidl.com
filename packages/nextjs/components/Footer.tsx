import Image from "next/image";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <div className="bg-[#182232] lg:p-12 p-8 flex items-center justify-center text-[16px]">
      <div className="grid grid-cols-12 lg:gap-8 gap-3 max-w-7xl">
        <div className="col-span-12 lg:col-span-6 flex flex-col">
          <div className="flex flex-col">
            <Image src="/assets/logo-white.svg" alt="BuidlGuidl logo" width={150} height={150} />
            <p className="text-white lg:w-1/2">
              A curated group of Ethereum builders creating products, prototypes, and tutorials to enrich the web3
              ecosystem.
            </p>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <div className="grid grid-cols-12 gap-y-6 gap-x-0 xs:gap-x-6">
            <div className="flex flex-col col-span-12 sm:col-span-4 text-white space-y-2 font-thin">
              <p className="m-0 text-info font-normal">BuidlGuidl</p>
              <a href="https://app.buidlguidl.com/builds" target="_blank" rel="noreferrer" className="m-0">
                Builds
              </a>
              <a href="https://github.com/scaffold-eth/scaffold-eth-2" target="_blank" rel="noreferrer" className="m-0">
                Scaffold-ETH 2
              </a>
              <a href="https://speedrunethereum.com/" target="_blank" rel="noreferrer" className="m-0">
                Speedrun Ethereum
              </a>
            </div>
            <div className="flex flex-col col-span-12 sm:col-span-4 text-white space-y-2 font-thin">
              <p className="m-0 text-info font-normal">Resources</p>
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
            <div className="flex flex-col col-span-12 sm:col-span-4 text-white space-y-2 font-thin">
              <p className="m-0 text-info font-normal">Social</p>
              <a href="https://twitter.com/buidlguidl" target="_blank" rel="noreferrer" className="m-0">
                Twitter
              </a>
              <a href="https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA" target="_blank" rel="noreferrer" className="m-0">
                Telegram
              </a>
              <a href="https://discord.gg/84Abq4VbMQ" target="_blank" rel="noreferrer" className="m-0">
                Discord
              </a>
              <a
                href="https://www.youtube.com/@austingriffith3550/playlists"
                target="_blank"
                rel="noreferrer"
                className="m-0"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
