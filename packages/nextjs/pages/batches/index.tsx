import Image from "next/image";
import Link from "next/link";
import { Footer } from "~~/components/Footer";
import { MetaHeader } from "~~/components/MetaHeader";
import TrackedLink from "~~/components/TrackedLink";

// Placeholder items, should we put batches or batches+builders here?
const PLACEHOLDER_ITEMS = [
  {
    name: "Scaffold-ETH 2",
    description:
      "Scaffold-ETH 2 is a forkable Ethereum dApp that allows developers to build and deploy their own Ethereum dApps in minutes.",
    imageSrc: "/assets/build-walletHackedRecovery.png",
    link: "https://github.com/buidlguidl/batches/tree/main/packages/event-wallet",
  },
  {
    name: "SE-2 Wallet",
    description: "A simple and forkable mobile Ethereum wallet written in React Native",
    imageSrc: "/assets/build-addressVision.png",
    link: "https://github.com/buidlguidl/batches/tree/main/packages/se2-wallet",
  },
  {
    name: "Test App",
    description: "A simple and forkable mobile Ethereum wallet written in React Native",
    imageSrc: "/assets/build-abiNinja.png",
    link: "https://github.com/buidlguidl/batches/tree/main/packages/se2-wallet",
  },
  {
    name: "Event Wallet",
    description:
      "Web wallet with wallet connect up front send funds quickly on any EVM network fork this wallet and build your own!",
    imageSrc: "/assets/build-abiNinja.png",
    link: "https://github.com/buidlguidl/batches/tree/main/packages/event-wallet",
  },
  {
    name: "abi.ninja",
    description:
      "Instant frontend to interact with any contract on Ethereum. Share your customized setup with friends!",
    imageSrc: "/assets/build-abiNinja.png",
    link: "https://github.com/buidlguidl/batches/tree/main/packages/abi-ninja",
  },
];

// Custom header for the batches pagesince the "Go to app" button is different
const BatchesHeader = () => {
  return (
    <div className="navbar min-h-0 flex-shrink-0 justify-between px-0 py-4 pb-8 md:pb-4 sm:px-2 bg-[#EFFBCA]">
      <div className="navbar-start w-auto lg:w-1/2">
        <Link href="/" passHref className="flex items-center gap-2 ml-4 mr-6">
          <div className="flex relative w-[130px] md:w-[150px] h-[36px]">
            <Image alt="BuidlGuidl logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
        </Link>
      </div>
      <div className="navbar-end flex-grow mr-4 space-x-6 z-10">
        <TrackedLink
          id="buidlguidl:app"
          href="https://app.buidlguidl.com"
          className="btn btn-primary bg-info hover:border-info text-[#182232] btn-xs md:btn-sm md:px-5 hover:opacity-100"
        >
          Go to app
        </TrackedLink>
      </div>
    </div>
  );
};

const Batches = () => {
  return (
    <>
      <MetaHeader
        title="BuidlGuidl Batches | Level Up Your Web3 Skills"
        description="Explore BuidlGuidl Batches to enhance your skills as a web3 developer. Join our program and collaborate with other Ethereum builders."
      />
      {/* Hero section with custom header */}
      <div className="relative flex flex-col items-center pb-48">
        <div className="absolute inset-0 bg-gradient-to-b from-[#EAFFA9] via-[#f3ffca] to-[#EDEFFF]"></div>
        <div className="absolute inset-0 bg-[url(/assets/bg-batches-train.png)] bg-contain bg-no-repeat bg-bottom opacity-30 xl:hidden"></div>
        <BatchesHeader />
        <div className="container relative flex items-center max-w-[90%] lg:max-w-6xl px-4 py-16 min-h-[60vh] lg:py-20 lg:px-32">
          <div className="space-y-4 z-10 relative">
            <Image src="/assets/bg-batches-onboarding.svg" alt="BG Onboarding" width={330} height={200} priority />
            <div className="relative">
              <Image src="/assets/bg-batches-text.svg" alt="Batches text" width={700} height={400} priority />
              <div className="absolute -top-32 -right-96 hidden xl:block">
                <Image src="/assets/bg-batches-train.png" alt="BG Train" width={600} height={500} priority />
              </div>
            </div>
            <h3 className="pt-2 text-xl">From beginner to expert in dApp development</h3>
          </div>
        </div>
      </div>

      {/* What are BG Batches */}
      <div className="bg-[#EEF0FE] py-16 lg:py-24 " id="what-are-batches">
        <div className="container max-w-[90%] lg:max-w-6xl mx-auto px-4 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="text-center md:text-left lg:w-1/2 space-y-6">
              <h2 className="text-3xl lg:text-5xl font-bold">What are BuidlGuidl Batches?</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  BuidlGuidl Batches is a program designed for builders who have completed Speedrun Ethereum. It&apos;s
                  the next step in your journey as a web3 developer, offering additional challenges and skills to
                  enhance your abilities.
                </p>
                <p>
                  After completing the program, you&apos;ll be equipped with both technical and social skills that will
                  help you collaborate more effectively in the web3 ecosystem.
                </p>
                <ul className="list-disc list-inside">
                  <li>Challenges beyond Speedrun Ethereum</li>
                  <li>Mentorship on contributing to open source projects on GitHub</li>
                  <li>Open source etiquette and best practices</li>
                  <li>Advanced Smart Contract Interactions</li>
                  <li>Real-world Project Experience</li>
                </ul>
              </div>
            </div>
            <div className="lg:w-1/2">
              <Image
                src="/assets/bg-batches-castle.png"
                alt="BG Batches Castle"
                width={600}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* How Batches Work */}
      <div className="bg-[#EBFFA9] py-16 lg:py-24">
        <div className="container max-w-[90%] lg:max-w-6xl mx-auto px-4 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="text-center md:text-left lg:w-1/2 space-y-6">
              <h2 className="text-3xl lg:text-5xl font-bold">How do Batches work?</h2>
              <div className="space-y-4 text-gray-700">
                <ul className="list-disc list-inside">
                  <li>Each batch has its own GitHub repository</li>
                  <li>Participants deploy smart contracts to interact with a batch contract</li>
                  <li>Collaborate with peers and mentors in a dedicated Telegram group</li>
                  <li>Complete challenges and contribute to open source projects</li>
                </ul>
              </div>
            </div>
            <div className="lg:w-1/2">
              <Image
                src="/assets/bg-batches-how-batches-work.png"
                alt="How Batches Work Illustration"
                width={592}
                height={567}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Batch Showcase */}
      <div className="bg-[#EDEFFF] pt-16 lg:pt-24">
        <div className="container max-w-[90%] lg:max-w-6xl mx-auto px-4 lg:px-12">
          <div className="flex justify-center items-center">
            <Image
              src={"/assets/bg-batches-winners.svg"}
              alt={"Winners"}
              width={50}
              height={50}
              className="mb-5 mr-3"
            />
            <h2 className="text-center md:text-left text-3xl lg:text-5xl font-bold mb-0">Explore our batches</h2>
          </div>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Join a BuidlGuidl Batch to enhance your skills and collaborate with other web3 developers.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLACEHOLDER_ITEMS.map((batch, index) => (
              <TrackedLink
                id={batch.name}
                href={batch.link}
                className="w-full card bg-white rounded-[46px]"
                key={index}
              >
                <div className="w-full h-[220px] relative">
                  <Image
                    src={batch.imageSrc}
                    alt={batch.name}
                    fill
                    className="w-full object-center object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="card-body gap-0 bg-base-100">
                  <h3 className="card-title m-0">{batch.name}</h3>
                  <p className="m-0">{batch.description}</p>
                </div>
              </TrackedLink>
            ))}
          </div>
        </div>
        <div className="mt-16">
          <Image
            src="/assets/bg-batches-footer.png"
            alt="Batches Footer"
            width={2400}
            height={300}
            className="w-full h-auto"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Batches;
