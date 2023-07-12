import Image from "next/image";
import type { NextPage } from "next";
import { Card } from "~~/components/Card";
import { Header } from "~~/components/Header";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      {/* Hero section with header */}
      <div className="bg-[url(/assets/hero.png)] min-h-[85vh] bg-cover bg-center">
        <Header />
        <div className="flex justify-center">
          <h1 className="text-center text-4xl lg:text-6xl mt-8 max-w-md lg:max-w-lg">Welcome to the BuidlGuidl</h1>
        </div>
      </div>
      {/* Star Building on Ethereum */}
      <div className="bg-white">
        <div className="container max-w-[90%] lg:max-w-7xl m-auto py-16 lg:py-20 lg:px-12 flex flex-col-reverse lg:flex-row items-center gap-5 lg:gap-0">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-6xl lg:w-3/4 text-center lg:text-left">Start Building on Ethereum</h2>
            <ul className="list-disc list-inside flex flex-col space-y-3 m-auto lg:mx-0 max-w-[300px] lg:max-w-none">
              <li>7 start to finish tutorials </li>
              <li>Learn from the best Ethereum developers (+ guidance)</li>
              <li>Level Up your skill and get paid</li>
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
            <Image src="/assets/sre-forest.png" alt="hero" width={600} height={600} />
          </div>
        </div>
        <div className="bg-[url(/assets/sre-path.png)] bg-repeat-x h-32 relative bg-[35%_top]"></div>
      </div>
      {/* Test Your knowledge */}
      <div className="bg-base-100 -mt-16">
        <div className="container max-w-[90%] lg:max-w-7xl m-auto py-16 lg:py-28 lg:px-12">
          <div className="bg-[url(/assets/dice.png)] bg-no-repeat bg-right-bottom lg:bg-right bg-[length:100px] lg:bg-auto max-w-3xl pb-14">
            <div className="mt-6 lg:mt-0">
              <h2 className="text-3xl lg:text-5xl text-center lg:text-left">Test Your Knowledge</h2>
              <p className="text-center lg:text-left lg:w-3/4">
                Learn that you don’t know what you don’t know. you need to go through tour of duty + SRE gets you into
                the BG ?
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
              num={6}
              name="Multi-Sig Wallet"
              src="/assets/chall-multisig.png"
              description="👩‍👩‍👧‍👧 Using a smart contract as a wallet we can secure assets by requiring multiple accounts to 'vote' on transactions."
              link="https://github.com/scaffold-eth/scaffold-eth-challenges/tree/challenge-5-multisig"
            />
            <Card
              num={5}
              name="State Channels"
              src="/assets/chall-state.png"
              description="🐌 The Ethereum blockchain has great decentralization & security properties. These properties come at a price"
              link="https://github.com/scaffold-eth/scaffold-eth-challenges/tree/challenge-9-state-channels"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
