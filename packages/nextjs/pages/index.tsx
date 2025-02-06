import Image from "next/image";
import Link from "next/link";
import type { GetStaticProps, NextPage } from "next";
import { BuildCard } from "~~/components/BuildCard";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { JourneyCard } from "~~/components/JourneyCard";
import { LearnMoreCard } from "~~/components/LearnMoreCard";
import { MetaHeader } from "~~/components/MetaHeader";
import TrackedLink from "~~/components/TrackedLink";

type Stats = {
  builderCount: string;
  buildCount: string;
  streamedEth: number;
  buildersIncrementMonth: number;
  buildsIncrementMonth: number;
  streamedEthIncrement: number;
};

const Home: NextPage<{
  stats: Stats;
}> = ({ stats }) => {
  return (
    <>
      <MetaHeader />
      {/* Hero section with header */}
      <div className="relative h-[75vh] flex flex-col">
        <div className="absolute h-1/4 w-full top-0 left-0 hero-top-gradient"></div>
        <Header />
        <div className="bg-[url(/assets/hero-new.png)] bg-[#EFFBCA] bg-cover bg-center flex-grow mt-[-50px]">
          <div className="flex flex-col justify-center items-center md:items-start md:justify-left mx-6 h-full md:ml-14 mt-[-30px]">
            <h1 className="text-center md:text-left z-10 lg:text-5xl text-4xl">
              Learn, build, and <br /> thrive on Ethereum
            </h1>
            <Link href="#start-building-on-ethereum">
              <TrackedLink
                id="hero-button"
                href="#start-building-on-ethereum"
                className="btn btn-secondary btn-md px-8 hover:opacity-100 w-fit mt-4"
              >
                Get started
              </TrackedLink>
            </Link>
          </div>
        </div>
        <div className="absolute h-1/4 w-full bottom-0 left-0 hero-bottom-gradient flex items-end justify-center"></div>
      </div>

      {/* Quote section*/}
      <div className="bg-base-100">
        <div className="container max-w-[90%] lg:max-w-7xl m-auto py-16 lg:py-20 lg:pl-20 flex flex-col-reverse lg:flex-row items-center lg:items-start lg:gap-10">
          {/* Quote image */}
          <div className="flex flex-col items-center max-w-md lg:max-w-md lg:mt-6">
            <Image
              src="/assets/atg.jpg"
              alt="austin griffith"
              width={120}
              height={120}
              className="rounded-[150px] shadow-xl"
            />
          </div>
          {/* Quote Text */}
          <div className="md:max-w-[80%] lg:max-w-[70%] flex flex-col items-center lg:items-start">
            <p className="font-thin text-xl lg:text-2xl text-center lg:text-left mb-10 lg:mb-4">
              “BuidlGuidl is educating Ethereum developers, creating state-of-the-art tools, and building cool things
              onchain!”
            </p>
            <p className="m-0 text-xl font-medium">Austin Griffith</p>
            <p className="m-0 mb-4 text-md font-thin">BuidlGuidl Founder</p>
          </div>
        </div>
      </div>

      {/* Start Building on Ethereum */}
      <div className="bg-white pb-16" id="start-building-on-ethereum">
        <div className="container max-w-[90%] lg:max-w-6xl m-auto py-16 lg:py-28 lg:px-12 flex flex-col items-center lg:items-start">
          <div className="bg-[url(/assets/spaceship.png)] bg-no-repeat bg-right-top lg:max-w-[580px] bg-[length:85px] lg:bg-[length:100px] max-w-[500px] pb-10">
            <div className="mt-6 lg:mt-0">
              <h2 className="text-3xl lg:text-5xl text-center lg:text-left lg:max-w-lg">
                Start building <br /> on Ethereum
              </h2>
              <p className="text-center lg:text-left lg:w-3/4">
                Start your journey with Speedrun Ethereum, then join our onboarding Batches, and finally, apply to our
                Grants program!
              </p>
            </div>
          </div>
          {/* Cards container */}
          <div className="flex gap-8 flex-wrap lg:flex-nowrap justify-center lg:max-w-5xl">
            {/* Card */}
            <JourneyCard
              name="Speedrun Ethereum"
              src="/assets/chall-dex.png"
              description="Learn the most important concepts and level up your skills."
              link="https://speedrunethereum.com"
            />
            <JourneyCard
              name="Join the batches"
              src="/assets/batches-card.png"
              description="Continue learning in our Batches monthly program for up-and-coming devs."
              link="/batches"
            />
            <JourneyCard
              name="Small Grants"
              src="/assets/bg-grants-card.png"
              description="BuidlGuidl can sponsor up to 1 ETH to build your idea. Funding meaningful projects across the ecosystem."
              link="https://grants.buidlguidl.com/"
            />
          </div>
        </div>
      </div>

      {/* Scaffold-ETH 2 */}
      <div className="bg-[#FFD2B3]">
        <div className="-mt-12 bg-repeat-x h-20 bg-[35%_top] bg-white"></div>
        <div className="-mt-12 bg-[url(/assets/sre-path.png)] bg-repeat-x h-20 bg-[35%_top]"></div>
        <div className="container max-w-[90%] lg:max-w-6xl m-auto py-16 lg:py-20 lg:px-12 flex flex-col-reverse lg:flex-row items-center gap-5 lg:gap-0">
          <div className="space-y-6">
            <h2 className="text-2xl lg:text-5xl lg:w-3/4 text-center lg:text-left">
              The stack for prototyping to production
            </h2>
            <ul className="list-disc list-outside flex flex-col space-y-3 m-auto lg:mx-0 pl-8 lg:pl-4 max-w-[300px] lg:max-w-none">
              <li>
                A modern, clean version of scaffold-eth with <br /> RainbowKit, Wagmi, NextJS and TypeScript
              </li>
              <li>Open source tooling built and maintained by BuidlGuidl</li>
            </ul>
            <div className="text-center lg:text-left">
              <TrackedLink
                id="Scaffold-ETH-2"
                href="https://scaffoldeth.io"
                className="btn btn-accent btn-md lg:self-start px-8 hover:opacity-100"
              >
                Start using SE-2
              </TrackedLink>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-6">
              <Image src="/assets/se2-logo.svg" alt="Scaffold-ETH 2 logo" width={40} height={40} />
              <p className="text-2xl lg:text-3xl font-semibold mb-0 mt-2">Scaffold-ETH 2</p>
            </div>
            <div className="max-w-[400px] lg:max-w-none">
              <Image src="/assets/se2-ui.png" alt="Scaffold-ETH 2 screen" width={900} height={900} />
            </div>
          </div>
        </div>
      </div>

      {/* Feature Builds */}
      <div className="bg-base-300">
        <div className="container flex flex-col items-center justify-center max-w-[90%] lg:max-w-6xl mx-auto py-16 lg:py-28 lg:px-12 gap-6">
          <div className="gap-4 flex flex-col items-center">
            <div className="flex items-baseline gap-1 md:gap-3">
              <Image src="/assets/ranking-featured-icon.svg" alt="rankings icons" width={40} height={40} />
              <h2 className="text-3xl lg:text-5xl font-semibold my-0">Featured Builds</h2>
            </div>
            <p className="lg:w-3/5 text-center m-0">
              Powered by Scaffold-ETH, these forkable builds are one of the easiest ways to launch a project.
            </p>
          </div>
          {/* Card Container */}
          <div className="flex gap-8 flex-wrap lg:flex-nowrap justify-center mt-8">
            {/* Card */}
            <BuildCard
              name="abi.ninja"
              description="Interact with any contract on Ethereum with a friendly UI/UX"
              src="/assets/build-abiNinja.png"
              link="https://abi.ninja/"
            />
            <BuildCard
              name="hacked wallet recovery"
              description="Recover assets from a compromised wallet using Flashbots"
              src="/assets/build-walletHackedRecovery.png"
              link="https://hackedwalletrecovery.com/"
            />
            <BuildCard
              name="address.vision"
              description="Search for an address or ENS to show their token and NFT holdings in most popular EVMs"
              src="/assets/build-addressVision.png"
              link="https://address.vision/"
            />
          </div>
          <TrackedLink id="buidlguidl:projects" href="https://app.buidlguidl.com/builds" className="link mt-8">
            See all projects
          </TrackedLink>
        </div>
      </div>

      {/* Cohort Streams*/}
      <div className="bg-white">
        <div className="container max-w-[90%] lg:max-w-7xl m-auto py-16 lg:py-20 xl:pl-24 lg:pl-16 flex flex-col-reverse lg:flex-row items-center gap-5 lg:gap-0">
          <div className="space-y-6 lg:max-w-[40%] flex flex-col items-center lg:items-start">
            <h2 className="text-2xl lg:text-4xl xl:text-5xl text-center lg:text-left">Cohort Streams</h2>
            <div className="text-center px-1 max-w-lg lg:max-w-none lg:w-11/12 lg:px-0 lg:text-left">
              <p className="m-0 mb-3">
                BuidlGuidl Cohort Streams are a novel funding mechanism that stream ETH to builders making an impact on
                specific objectives.
              </p>
              <p className="m-0 mb-6">
                We use Cohort Streams to fund internal initiatives but also external{" "}
                <TrackedLink
                  id="Cohort-Streams-HackerHouse"
                  href="https://hackerhouse.buidlguidl.com/"
                  className="underline underline-offset-4"
                >
                  up-and-coming
                </TrackedLink>{" "}
                <TrackedLink
                  id="Cohort-Streams-ZKCrypto"
                  href="https://zkcrypto-streams.buidlguidl.com/"
                  className="underline underline-offset-4"
                >
                  high-impact
                </TrackedLink>{" "}
                devs.
              </p>
              <p className="m-0 mb-6">
                You can{" "}
                <TrackedLink
                  id="Cohort-Streams-Mercs"
                  href="https://github.com/BuidlGuidl/mercs.buidlguidl.com"
                  className="underline underline-offset-4"
                >
                  fork the repo
                </TrackedLink>{" "}
                and make your own cohort stream too!
              </p>
              <p className="m-0 mb-3">
                In true BuidlGuidl fashion, we built the cohort streaming app{" "}
                <TrackedLink
                  id="Cohort-Streams-Youtube"
                  href="https://www.youtube.com/watch?v=MBlR7UWBvrU&list=PLJz1HruEnenD77QAsqnk7KG8rSOMk0B99&index=6"
                  className="underline underline-offset-4"
                >
                  live on camera
                </TrackedLink>
                .
              </p>
              <p className="lg:mb-3 mt-12 lg:mt-8 text-sm mb-0">SUPPORTED BY</p>
              <div className="flex flex-col items-center lg:items-start">
                <Image src="/assets/ef-logo.png" alt="EF logo" width={200} height={200} />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center lg:pl-16 xl:pl-12 2xl:pl-24 lg:-mr-12 xl:-mr-16 2xl:-mr-24">
            <div className="max-w-md lg:max-w-md xl:max-w-xl 2xl:max-w-2xl">
              <Image src="/assets/streams.png" alt="streams illustration" width={700} height={700} />
            </div>
          </div>
        </div>
      </div>

      {/* Cohorts */}
      <div className="bg-base-100">
        <div className="mx-auto lg:max-w-7xl">
          <div className="container max-w-[90%] lg:max-w-7xl m-auto py-16 lg:py-20 xl:pl-24 lg:pl-16 flex flex-col-reverse lg:flex-row items-center gap-5 lg:gap-0">
            {/* Partnerships Text Content */}
            <div className="space-y-6 md:max-w-[70%] lg:max-w-[40%] flex flex-col items-center lg:items-start text-center lg:text-left">
              <h2 className="text-2xl lg:text-4xl xl:text-5xl">
                Partnering with
                <br /> ecosystem heroes
              </h2>
              <p className="m-0 lg:pr-8 mb-3">
                BuidlGuidl is looking for L2s and Ethereum protocols to partner with to help grow your developer
                ecosystem.
              </p>
              <p className="m-0 lg:pr-8 mb-6">
                We can build educational content and apps on your EVM chain to help more builders ship more apps!
              </p>
              <p className="lg:mb-3 mt-12 lg:mt-8 text-sm">ECOSYSTEM SUPPORT FROM</p>
              <div className="flex flex-col md:flex-row gap-7 items-center justify-center lg:justify-start">
                <Image src="/assets/op-logo.svg" alt="Optimism logo" width={48} height={48} />
                <Image src="/assets/ens-logo-dao.png" alt="ENS logo" width={96} height={64} />
              </div>
              <TrackedLink
                id="co-fund-email"
                href="https://telegram.me/austingriffith"
                className="btn btn-primary btn-md px-8 mt-8 hover:opacity-100"
              >
                Support BuidlGuidl
              </TrackedLink>
            </div>
            <div className="flex flex-col items-center lg:pl-16 xl:pl-12 2xl:pl-24 lg:-mr-12 xl:-mr-16 2xl:-mr-24">
              <div className="max-w-md lg:max-w-md xl:max-w-xl 2xl:max-w-2xl">
                <Image src="/assets/cohorts.png" alt="cohorts illustration" width={700} height={700} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Streamed / Builder / Builds  */}
      <div className="bg-white">
        <div className="container flex flex-col items-center justify-center max-w-[90%] lg:max-w-7xl mx-auto py-16 lg:py-28 lg:px-12 gap-6">
          <div className="flex flex-col gap-8 md:flex-row justify-between items-start mt-4 lg:w-4/5">
            <div className="flex items-start gap-3">
              <Image src="/assets/diamond.svg" alt="diamon icon" width={40} height={40} className="mt-1" />
              <div className="flex flex-col items-start">
                <h2 className="text-3xl lg:text-5xl font-semibold my-0 text-primary">
                  {stats.streamedEth.toFixed(2)}Ξ
                </h2>
                <p className="text-sm my-0 -mt-1 lg:-mt-2 font-medium">Streamed</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Image src="/assets/builders.svg" alt="builder icon" width={45} height={45} className="mt-1" />
              <div className="flex flex-col items-start">
                <h2 className="text-3xl lg:text-5xl font-semibold my-0 text-primary">{stats.builderCount}</h2>
                <p className="text-sm my-0 -mt-1 lg:-mt-2 font-medium">Builders</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Image src="/assets/builds-uploaded.svg" alt="build icon" width={30} height={30} className="mt-1" />
              <div className="flex flex-col items-start">
                <h2 className="text-3xl lg:text-5xl font-semibold my-0 text-primary">{stats.buildCount}</h2>
                <p className="text-sm my-0 -mt-1 lg:-mt-2 font-medium">Builds Uploaded</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BG Client */}
      <div className="bg-base-300">
        <div className="mx-auto lg:max-w-7xl">
          <div className="container max-w-[90%] lg:max-w-7xl m-auto py-16 lg:py-20 xl:pl-24 lg:pl-16 flex flex-col-reverse lg:flex-row items-center gap-5 lg:gap-0">
            <div className="space-y-6 md:max-w-[70%] lg:max-w-[40%] flex flex-col items-center lg:items-start text-center lg:text-left">
              <h2 className="text-2xl lg:text-4xl xl:text-5xl">
                BuidlGuidl <br /> {'"Client"'}{" "}
              </h2>
              <p className="m-0 lg:pr-8 mb-3">One line command to run an Ethereum full node!</p>
              <div className="flex gap-6 mt-8">
                <TrackedLink
                  id="BG-Nodes"
                  href="https://client.buidlguidl.com"
                  className="btn btn-md btn-secondary px-8 hover:opacity-100"
                >
                  Run Ethereum
                </TrackedLink>
                <Image src="/assets/bg-client-logo.svg" alt="BG Client logo" width={150} height={150} />
              </div>
            </div>
            <div className="flex flex-col items-center lg:pl-16 xl:pl-12 2xl:pl-24 lg:-mr-12 xl:-mr-16 2xl:-mr-24">
              <div className="max-w-md lg:max-w-md xl:max-w-xl 2xl:max-w-2xl">
                <Image src="/assets/bg-client-2.png" alt="BG Client running on a computer" width={700} height={700} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learn More  */}
      <div className="bg-skin">
        <div className="container flex flex-col items-center justify-center max-w-[90%] lg:max-w-6xl mx-auto py-16 lg:py-24 lg:px-12 gap-6">
          <p className="font-thin text-xl my-0">LEARN MORE</p>
          {/* Card Container */}
          <div className="flex gap-8 flex-wrap lg:flex-nowrap justify-center mt-4">
            {/* Card */}
            <LearnMoreCard
              name="🧪 BG Labs"
              src="/assets/bg-labs.png"
              description="A series of videos to help you get started in the ecosystem and keep learning."
              link="https://www.youtube.com/watch?v=4hl61AmEGwU&list=PLJz1HruEnenD77QAsqnk7KG8rSOMk0B99"
            />
            <LearnMoreCard
              name="🚢 Shipping Log"
              src="/assets/shipping-log.png"
              description="Check out our newsletter to be updated on our tools, hackathons and more."
              link="https://buidlguidl.substack.com/"
            />
            <LearnMoreCard
              name="📡 BuidlGuidl on X"
              src="/assets/bg-client.png"
              description="Follow us on X for updates on Ethereum developer experience and onbaording!"
              link="https://x.com/buidlguidl"
            />
          </div>
        </div>
      </div>

      {/* Image above footer */}
      <div className="bg-skin relative -mb-[20px]">
        <div className="object-cover w-full">
          <Image src="/assets/bg-batches-footer.png" alt="Footer image" width={2500} height={1000} />
        </div>
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<{ stats: Stats }> = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BG_BACKEND_API}/api/stats`);

  if (!res.ok) throw new Error(`Failed to fetch stats, received status ${res.status}`);

  const stats = (await res.json()) as Stats;

  return {
    props: {
      stats,
    },
    // 6 hours refresh.
    revalidate: 21600,
  };
};

export default Home;
