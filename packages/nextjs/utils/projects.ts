export type Project = {
  name: string;
  description: string;
  src: string;
  link: string;
  featured?: boolean;
  metrics?: { value: string; label: string }[];
  imageFit?: "cover" | "contain";
  imageBg?: string;
};

// Job Board, ENS Builder Grants and CTF still need their own image + final copy.
export const PROJECTS: Project[] = [
  {
    name: "SpeedRunEthereum",
    description: "Learn to build on Ethereum through hands-on challenges, from a simple NFT to a full DEX.",
    src: "/assets/build-sre-thumb.png",
    link: "https://speedrunethereum.com",
    featured: true,
    metrics: [{ value: "10k", label: "monthly visitors" }],
  },
  {
    name: "Scaffold-ETH 2",
    description: "Open source toolkit for building dApps, with RainbowKit, Wagmi, NextJS and TypeScript.",
    src: "/assets/build-se2-og.png",
    link: "https://scaffoldeth.io",
    featured: true,
    imageFit: "contain",
    imageBg: "bg-gradient-to-b from-[#EEF4FF] to-white",
    metrics: [{ value: "1.5k", label: "weekly installs" }],
  },
  {
    name: "ENS Builder Grants",
    description: "The grants platform ENS runs to fund public goods in the Ethereum and Web3 ecosystems.",
    src: "/assets/build-ensGrants.png",
    link: "https://builder.ensgrants.xyz/",
    featured: true,
    metrics: [
      { value: "72.5", label: "ETH granted" },
      { value: "65k", label: "USDC granted" },
    ],
  },
  {
    name: "Ethereum Job Board",
    description: "Find the best jobs in Ethereum, and post your own openings.",
    src: "/assets/build-jobBoard.jpg",
    link: "https://www.ethereumjobboard.com/",
  },
  {
    name: "abi.ninja",
    description: "Interact with any contract on Ethereum with a friendly UI/UX",
    src: "/assets/build-abiNinja.png",
    link: "https://abi.ninja/",
  },
  {
    name: "hacked wallet recovery",
    description: "Recover assets from a compromised wallet using Flashbots",
    src: "/assets/build-walletHackedRecovery.png",
    link: "https://hackedwalletrecovery.com/",
  },
  {
    name: "BuidlGuidl Client",
    description: "One line command to run an Ethereum full node!",
    src: "/assets/bg-client-2.png",
    link: "https://client.buidlguidl.com",
  },
  {
    name: "Ethereum on Tour",
    description: "Bringing Ethereum curriculum, tools, and mentorship to you!",
    src: "/assets/workshops.png",
    link: "https://tour.buidlguidl.com",
  },
  {
    name: "Capture The Flag",
    description: "Reclaim the flags from the BuidlGuidl fortress by solving Ethereum coding challenges.",
    src: "/assets/build-ctf.jpg",
    link: "https://ctf.buidlguidl.com/",
  },
];
