import Image from "next/image";
import type { NextPage } from "next";
import { BuildCard } from "~~/components/BuildCard";
import { Card } from "~~/components/ChallengeCard";
import { Header } from "~~/components/Header";
import { LearnMoreCard } from "~~/components/LearnMoreCard";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      {/* Hero section with header */}
      <div className="bg-[url(/assets/hero.png)] min-h-[85vh] bg-cover bg-center">
        <Header />
        <div className="flex justify-center">
          <h1 className="text-center text-4xl lg:text-6xl mt-8 max-w-md lg:max-w-2xl px-2">
            Learn, build, and flourish in Ethereum
          </h1>
        </div>
      </div>

      {/* Star Building on Ethereum */}
      <div className="bg-white">
        <div className="container max-w-[90%] lg:max-w-7xl m-auto py-16 lg:py-20 lg:px-12 flex flex-col-reverse lg:flex-row items-center gap-5 lg:gap-0">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-5xl lg:w-3/4 text-center lg:text-left">Start Building on Ethereum</h2>
            <ul className="list-disc list-inside flex flex-col space-y-3 m-auto lg:mx-0 max-w-[300px] lg:max-w-none">
              <li>Learn quickly by building real apps</li>
              <li>Speedrun the most important concepts</li>
              <li>Level up your skills and get paid</li>
            </ul>
            <div className="text-center lg:text-left">
              <a
                href="https://speedrunethereum.com/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-accent btn-md lg:self-start px-8"
              >
                Get Started Now!
              </a>
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
        <div className="container max-w-[90%] lg:max-w-7xl m-auto py-16 lg:py-28 lg:px-12">
          <div className="bg-[url(/assets/dice.png)] bg-no-repeat bg-right-bottom lg:bg-right-top bg-[length:100px] lg:bg-auto max-w-[680px] pb-14">
            <div className="mt-6 lg:mt-0">
              <h2 className="text-3xl lg:text-5xl text-center lg:text-left max-w-lg">Already have Solidity skills?</h2>
              <p className="text-center lg:text-left lg:w-3/4">
                Test your knowledge by building real world, complex apps.
              </p>
            </div>
          </div>
          {/* Cards container */}
          <div className="flex gap-8 flex-wrap lg:flex-nowrap justify-center">
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
              description="🐌 The Ethereum blockchain has great decentralization & security properties. These properties come at a price"
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
        <div className="container max-w-[90%] lg:max-w-7xl m-auto py-16 lg:py-20 lg:px-12 flex flex-col-reverse lg:flex-row items-center gap-5 lg:gap-0">
          <div className="space-y-6">
            <h2 className="text-2xl lg:text-5xl lg:w-3/4 text-center lg:text-left">
              The stack for prototyping to production
            </h2>
            <ul className="list-disc list-outside flex flex-col space-y-3 m-auto lg:mx-0 pl-8 lg:pl-4 max-w-[300px] lg:max-w-none">
              <li>
                A modern,clean version of scaffold-eth with <br /> RainbowKit, Wagmi, NextJS and TypeScript
              </li>
              <li>Open source tooling built and maintained by BuidlGuidl</li>
            </ul>
            <div className="text-center lg:text-left">
              <a
                href="https://www.github.com/scaffold-eth/scaffold-eth-2"
                target="_blank"
                rel="noreferrer"
                className="btn btn-accent btn-md lg:self-start px-8"
              >
                Start using SE-2
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-6">
              <Image src="/assets/se2-logo.svg" alt="hero" width={40} height={40} />
              <p className="text-2xl lg:text-3xl font-semibold mb-0 mt-2">Scaffold-ETH 2</p>
            </div>
            <div className="max-w-[400px] lg:max-w-none">
              <Image src="/assets/se2-ui.png" alt="hero" width={900} height={900} />
            </div>
          </div>
        </div>
      </div>

      {/* Feature Builds */}
      <div className="bg-base-300">
        <div className="container flex flex-col items-center justify-center max-w-[90%] lg:max-w-7xl mx-auto py-16 lg:py-28 lg:px-12 gap-6">
          <div className="gap-4 flex flex-col items-center">
            <div className="flex items-baseline gap-1 md:gap-3">
              <Image src="/assets/ranking-featured-icon.svg" alt="rankings icons" width={40} height={40} />
              <h1 className="text-3xl lg:text-5xl font-semibold my-0">Featured Builds</h1>
            </div>
            <p className="lg:w-3/5 text-center m-0">
              Some cool projects that have been built at the BuidlGuidl using Scaffold-ETH
            </p>
            <a
              href="https://app.buidlguidl.com/builds"
              target="_blank"
              rel="noreferrer"
              className="btn btn-accent btn-md px-8"
            >
              Explore the Builds
            </a>
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
              description="Interact with any contract on Ethereum"
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
        </div>
      </div>

      {/* Stats Streamed / Builder / Builds  */}
      {/* ToDo. Use real data*/}
      <div className="bg-white">
        <div className="container flex flex-col items-center justify-center max-w-[90%] lg:max-w-7xl mx-auto py-16 lg:py-28 lg:px-12 gap-6">
          <div className="flex flex-col gap-8 md:flex-row justify-between items-start mt-4 lg:w-4/5">
            <div className="flex items-start gap-3">
              <Image src="/assets/diamond.svg" alt="rankings icons" width={40} height={40} className="mt-1" />
              <div className="flex flex-col items-start">
                <h2 className="text-3xl lg:text-5xl font-semibold my-0 text-primary">454.83Ξ</h2>
                <p className="text-sm my-0 -mt-1 lg:-mt-3 font-medium">Streamed</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Image src="/assets/builders.png" alt="rankings icons" width={50} height={50} className="mt-1" />
              <div className="flex flex-col items-start">
                <h2 className="text-3xl lg:text-5xl font-semibold my-0 text-primary">797</h2>
                <p className="text-sm my-0 -mt-1 lg:-mt-3 font-medium">Builders</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Image src="/assets/builds-uploaded.svg" alt="rankings icons" width={30} height={30} className="mt-1" />
              <div className="flex flex-col items-start">
                <h2 className="text-3xl lg:text-5xl font-semibold my-0 text-primary">808</h2>
                <p className="text-sm my-0 -mt-1 lg:-mt-3 font-medium">Builds Uploaded</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Supporting Devs*/}
      <div className="bg-base-300">
        <div className="container flex flex-col items-center justify-center max-w-[90%] lg:max-w-7xl mx-auto py-16 lg:py-28 lg:px-12 gap-6">
          <div className="gap-4 flex flex-col items-center">
            <div className="flex items-baseline gap-3">
              <h1 className="text-3xl lg:text-5xl font-semibold my-0 text-center">
                Supporting up-and-coming <br />
                high-impact devs
              </h1>
            </div>
            <p className="lg:w-3/5 text-center m-0">
              BuidlGuidl streams to developers using our new cohort streams and other custom smart contracts.
            </p>
            <p className="lg:w-3/5 text-center m-0">
              Our goal is to enrich open learning withing the ethereum developer ecosystem
            </p>
            <a
              href="mailto:partnerships@buidlguidl.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary btn-md px-8 mt-2"
            >
              Connect with us
            </a>
            <div className="flex flex-col items-center mt-8 gap-3">
              <p className="text-center m-0">SUPPORTED BY</p>
              <div className="flex gap-6 items-center justify-center">
                <Image src="/assets/op-logo.png" alt="hero" width={50} height={50} />
                <Image src="/assets/ef-logo.png" alt="hero" width={150} height={50} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learn More  */}
      <div className="bg-base-100">
        <div className="container flex flex-col items-center justify-center max-w-[90%] lg:max-w-7xl mx-auto py-16 lg:py-24 lg:px-12 gap-6">
          <p className="font-thin text-xl my-0">LEARN MORE</p>
          {/* Card Container  */}
          <div className="flex gap-8 flex-wrap lg:flex-nowrap justify-center mt-4">
            {/* Card */}
            <LearnMoreCard
              name="BG Labs"
              src="/assets/bg-labs.png"
              description="A series of videos to help you get started in the ecosystem and keep learning."
              link="https://www.youtube.com/watch?v=4hl61AmEGwU&list=PLJz1HruEnenD77QAsqnk7KG8rSOMk0B99"
            />
            <LearnMoreCard
              name="Shipping log"
              src="/assets/shipping-log.png"
              description="Check out our newsletter to be updated on our tools, hackathons and more."
              link="https://buidlguidl.substack.com/"
            />
            <LearnMoreCard
              name="Tech Tree"
              src="/assets/tech-tree.png"
              description="If you need ideas, check out our Tech Tree to guide you in the ecosystem!"
              link="https://miro.com/app/board/uXjVPbc4b68=/"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
