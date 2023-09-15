import Image from "next/image";
import type { GetStaticProps, NextPage } from "next";
import { BuildCard } from "~~/components/BuildCard";
import { Card } from "~~/components/ChallengeCard";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
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

type Cohort = {
  id: string;
  name: string;
  url: string;
  builders: { [key: string]: any };
  balance: string;
};

const Home: NextPage<{ stats: Stats; cohortsData?: Cohort[] }> = ({ stats, cohortsData }) => {
  return (
    <>
      <MetaHeader />
      {/* Hero section with header */}
      <div className="bg-[url(/assets/hero.png)] min-h-screen bg-cover bg-center">
        <Header />
        <div className="flex justify-center">
          <h1 className="text-center text-3xl lg:text-5xl mt-6 lg:mt-8 max-w-md lg:max-w-2xl px-3">
            Learn, build, and thrive on Ethereum
          </h1>
        </div>
      </div>

      {/* Star Building on Ethereum */}
      <div className="bg-white">
        <div className="container max-w-[90%] lg:max-w-6xl m-auto py-16 lg:py-20 lg:px-12 flex flex-col-reverse lg:flex-row items-center gap-5 lg:gap-0">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-5xl lg:w-3/4 text-center lg:text-left">Start Building on Ethereum</h2>
            <ul className="list-disc list-inside flex flex-col space-y-3 m-auto lg:mx-0 max-w-[300px] lg:max-w-none">
              <li>Learn quickly by building real apps</li>
              <li>Speedrun the most important concepts</li>
              <li>Level up your skills and get paid</li>
            </ul>
            <div className="text-center lg:text-left">
              <TrackedLink
                id="SpeedRunEthereum"
                href="https://speedrunethereum.com/"
                className="btn btn-accent btn-md lg:self-start px-8"
              >
                Get Started Now!
              </TrackedLink>
            </div>
          </div>
          <div className="max-w-[300px] lg:max-w-none">
            <Image src="/assets/sre-forest.png" alt="hero" width={500} height={500} />
          </div>
        </div>
        <div className="bg-[url(/assets/sre-path.png)] bg-repeat-x h-32 relative bg-[35%_top]"></div>
      </div>

      {/* Test Your knowledge */}
      <div className="bg-base-100 -mt-16">
        <div className="container max-w-[90%] lg:max-w-6xl m-auto py-16 lg:py-28 lg:px-12">
          <div className="bg-[url(/assets/dice.png)] bg-no-repeat bg-right-bottom lg:bg-right-top bg-[length:100px] lg:bg-auto max-w-[680px] pb-10">
            <div className="mt-6 lg:mt-0">
              <h2 className="text-3xl lg:text-5xl text-center lg:text-left lg:max-w-lg">
                Already have Solidity skills?
              </h2>
              <p className="text-center lg:text-left lg:w-3/4">
                Test your knowledge by building real-world, complex apps.
              </p>
            </div>
          </div>
          {/* Cards container */}
          <div className="flex gap-8 flex-wrap lg:flex-nowrap justify-center lg:max-w-5xl">
            {/* Card */}
            <Card
              num={4}
              name="Build a DEX"
              src="/assets/chall-dex.png"
              description="💵 Build an exchange that swaps ETH to tokens and tokens to ETH."
              link="https://github.com/scaffold-eth/scaffold-eth-challenges/tree/challenge-4-dex"
            />
            <Card
              num={5}
              name="State Channels"
              src="/assets/chall-state.png"
              description="🐌 The Ethereum blockchain has great decentralization & security properties. These properties come at a price!"
              link="https://github.com/scaffold-eth/scaffold-eth-challenges/tree/challenge-9-state-channels"
            />
            <Card
              num={6}
              name="Multi-Sig Wallet"
              src="/assets/chall-multisig.png"
              description="👩‍👩‍👧‍👧 Using a smart contract as a wallet we can secure assets by requiring multiple accounts to 'vote' on transactions."
              link="https://github.com/scaffold-eth/scaffold-eth-challenges/tree/challenge-5-multisig"
            />
          </div>
        </div>
      </div>

      {/* Scaffold-ETH 2 */}
      <div className="base-200">
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
                href="https://www.github.com/scaffold-eth/scaffold-eth-2"
                className="btn btn-accent btn-md lg:self-start px-8"
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
          {/* Card Container  */}
          <div className="flex gap-8 flex-wrap lg:flex-nowrap justify-center mt-8">
            {/* Card */}
            <BuildCard
              name="Punkwallet"
              description="Web wallet with wallet connect up front send funds quickly on any EVM network fork this wallet and build your own!"
              src="/assets/build-punkwallet.png"
              link="https://app.buidlguidl.com/build/mTKhXMLEOCQEgPgG57R9"
            />
            <BuildCard
              name="abi.ninja"
              description="Interact with any contract on Ethereum with a friendly UI/UX"
              src="/assets/build-abiNinja.png"
              link="https://app.buidlguidl.com/build/oAXJ151jdDixCEgwnpf6"
            />
            <BuildCard
              name="Scaffold Wallet"
              description="Ethereum Minimalistic Wallet for Android"
              src="/assets/build-se-wallet.png"
              link="https://buidlguidl.com/build/oFWIYHo7WkvFQ29WQ12J"
            />
          </div>
          <TrackedLink id="buidlguidl:projects" href="https://app.buidlguidl.com/builds" className="link mt-8">
            See all projects
          </TrackedLink>
        </div>
      </div>

      {/* Stats Streamed / Builder / Builds  */}
      {/* ToDo. Use real data*/}
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

      {/* Supporting Devs*/}
      <div className="bg-base-300">
        <div className="mx-auto lg:max-w-[1980px] bg-none lg:bg-[url('/assets/support-high-impact-devs.png')] md:[background-position-x:45vw] md:[background-position-y:6vw] md:bg-auto bg-no-repeat ">
          <div className="container max-w-[90%] lg:max-w-6xl m-auto py-16 lg:py-20 lg:px-12 flex flex-col lg:flex-row items-center gap-5 lg:gap-0">
            <div className="text-center lg:text-left sm:w-1/2">
              <h2 className="text-2xl lg:text-5xl font-semibold my-0 mb-6">
                Supporting
                <br /> up-and-coming <br />
                high-impact devs
              </h2>
              <p className="lg:w-4/5 m-0 mb-3">
                Open Developer Streams are a unique way to fund development and give developers at the edges the freedom
                to build what they think is most important.
              </p>
              <p className="lg:w-4/5 m-0 mb-3">
                Their smart contracts get replenished monthly and allows them to withdraw funds whenever they like by
                submitting a few sentences about the work or a PR.
              </p>
              <p className="lg:w-4/5 m-0 mb-6">
                This approach produces novel open source solutions and a vibrant learning environment.
              </p>
              <TrackedLink
                id="partnerships-email"
                href="mailto:partnerships@buidlguidl.com"
                className="btn btn-secondary btn-md px-8 mt-2"
              >
                Connect with us
              </TrackedLink>
              <p className="lg:mb-3 mt-12 lg:mt-8 text-sm">SUPPORTED BY</p>
              <div className="flex flex-col gap-6 items-center lg:items-start">
                <Image src="/assets/ef-logo.png" alt="EF logo" width={200} height={200} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cohorts*/}
      <div className="bg-base-100">
        <div className="mx-auto lg:max-w-[1980px]">
          <div className="container px-4 md:px-12 mx-auto lg:max-w-6xl py-16 lg:py-20 grid lg:grid-cols-[1fr,auto] gap-5 lg:gap-0 items-center">
            {/* Cohorts Text Content */}
            <div className="md:w-1/2 lg:w-full md:mx-auto text-center lg:text-left mb-8 lg:mb-0">
              <h2 className="text-2xl lg:text-5xl font-semibold my-0 mb-6 pr-0 md:pr-12">
                Partnering with
                <br /> ecosystem heroes
              </h2>
              <p className="lg:w-4/5 m-0 mb-3">
                Focused Cohort Streams bundle together a group of developer streams and focuses them on a per-determined
                objective.
              </p>
              <p className="lg:w-4/5 m-0 mb-6">
                These cohorts provided the structure and guidance of an Operator who identifies, adds, and removes
                developers from the pool.
              </p>
              <p className="lg:mb-3 mt-12 lg:mt-8 text-sm">IN COLLABORATION WITH</p>
              <div className="flex flex-col md:flex-row gap-7 items-center justify-center lg:justify-start">
                <Image src="/assets/op-logo.svg" alt="Optimism logo" width={48} height={48} />
                <Image src="/assets/aztek-logo.png" alt="Aztek logo" width={120} height={44} />
                <Image src="/assets/starknet-logo.svg" alt="Starknet logo" width={152} height={35} />
              </div>
              <TrackedLink
                id="co-fund-email"
                href="mailto:partnerships@buidlguidl.com"
                className="btn btn-primary btn-md px-8 mt-8"
              >
                Co-fund with us
              </TrackedLink>
            </div>
            {/* Cohorts Table */}
            <div className="hidden xs:block mt-0 lg:mt-8">
              <table className="min-w-full">
                <thead>
                  <tr className="text-base">
                    <th className="bg-base-100 text-left py-3 px-8">Name</th>
                    <th className="bg-base-100 text-left py-3 px-8">Hackers</th>
                    <th className="bg-base-100 text-left py-3 px-8">ETH</th>
                  </tr>
                </thead>
                <tbody className="shadow-custom rounded-3xl text-sm ">
                  {cohortsData?.map(cohort => (
                    <tr
                      className="bg-base-400 hover:bg-base-100 border-b border-base-100 cursor-pointer"
                      key={cohort.id}
                      onClick={() => window.open(cohort.url, "_blank")}
                    >
                      <td className="py-3 px-4 xl:px-8">{cohort.name}</td>
                      <td className="py-3 px-4 xl:px-8">{Object.keys(cohort.builders).length}</td>
                      <td className="py-3 px-4 xl:px-8">
                        {parseFloat(cohort.balance).toFixed(2)}
                        <span className="text-xs ml-1">ETH</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Badges with Cohorts table data aggregation*/}
              <div className="mt-4 flex gap-4">
                <div className="badge badge-primary font-normal border-opacity-20 bg-opacity-20 py-3 px-4">
                  Cohorts <span className="ml-2 font-bold">{cohortsData?.length}</span>
                </div>
                <div className="badge badge-primary font-normal border-opacity-20 bg-opacity-20 py-3 px-4">
                  Hackers{" "}
                  <span className="ml-2 font-bold">
                    {
                      // Calculation for Total Number of Hackers
                      cohortsData?.reduce((acc, cohort) => acc + Object.keys(cohort.builders).length, 0)
                    }
                  </span>
                </div>
                <div className="badge badge-primary font-normal border-opacity-20 bg-opacity-20 py-3 px-4 min-h-12 sm:min-h-0">
                  ETH Streamed{" "}
                  <span className="ml-2 font-bold">
                    {
                      // Calculation for Total ETH Streamed
                      cohortsData?.reduce((acc, cohort) => acc + parseFloat(cohort.balance), 0).toFixed(2)
                    }{" "}
                    Ξ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder stats and titles  */}
      {/* ToDo. Use real titles and data*/}
      <div className="bg-white">
        <div className="container flex flex-col items-center justify-center max-w-[90%] lg:max-w-7xl mx-auto py-16 lg:py-28 lg:px-12 gap-6">
          <div className="flex flex-col gap-8 md:flex-row justify-between items-start mt-4 lg:w-4/5">
            <div className="flex items-start gap-3">
              <Image src="/assets/laptop.svg" alt="laptop icon" width={55} height={40} className="mt-1" />
              <div className="flex flex-col items-start">
                <h2 className="text-3xl lg:text-5xl font-semibold my-0 text-primary">1</h2>
                <p className="text-sm my-0 -mt-1 lg:-mt-2 font-medium">Stat 1</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Image src="/assets/builders.svg" alt="builder icon" width={45} height={45} className="mt-1" />
              <div className="flex flex-col items-start">
                <h2 className="text-3xl lg:text-5xl font-semibold my-0 text-primary">2</h2>
                <p className="text-sm my-0 -mt-1 lg:-mt-2 font-medium">Stat 2</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Image src="/assets/diamond.svg" alt="diamon icon" width={40} height={40} className="mt-1" />
              <div className="flex flex-col items-start">
                <h2 className="text-3xl lg:text-5xl font-semibold my-0 text-primary">3</h2>
                <p className="text-sm my-0 -mt-1 lg:-mt-2 font-medium">Stat 3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learn More  */}
      <div className="bg-base-100">
        <div className="container flex flex-col items-center justify-center max-w-[90%] lg:max-w-6xl mx-auto py-16 lg:py-24 lg:px-12 gap-6">
          <p className="font-thin text-xl my-0">LEARN MORE</p>
          {/* Card Container  */}
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
              name="🧬 Tech Tree"
              src="/assets/tech-tree.png"
              description="If you need ideas, check out our Tech Tree to guide you in the ecosystem!"
              link="https://miro.com/app/board/uXjVPbc4b68=/"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<{ stats: Stats }> = async () => {
  //const res = await fetch(`${process.env.BG_BACKEND_API}/api/stats`);
  const res = await fetch(`https://buidlguidl-v3.ew.r.appspot.com/api/stats`);

  if (!res.ok) throw new Error(`Failed to fetch stats, received status ${res.status}`);

  const stats = (await res.json()) as Stats;

  // Fetch data for cohorts section
  //const resCohorts = await fetch(`${process.env.BG_BACKEND_API}/cohorts/stats`);
  const resCohorts = await fetch(`https://buidlguidl-v3.ew.r.appspot.com/cohorts/stats`);

  if (!resCohorts.ok) throw new Error(`Failed to fetch cohorts, received status ${resCohorts.status}`);

  const cohortsData = (await resCohorts.json()) as Cohort[];

  return {
    props: {
      stats,
      cohortsData,
    },
    // 6 hours refresh.
    revalidate: 21600,
  };
};

export default Home;
