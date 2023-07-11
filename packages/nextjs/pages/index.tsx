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
      <div className="bg-[url(/assets/hero.png)] min-h-screen bg-cover bg-center">
        <Header />
        <div className="flex justify-center">
          <h1 className="text-center text-4xl md:text-6xl mt-8 max-w-md md:max-w-lg font-bold">
            Welcome to the BuidlGuidl
          </h1>
        </div>
      </div>
      {/* Star Building on Ethereum */}
      <div className="bg-white">
        <div className="flex justify-center items-center px-4">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full md:w-11/12 2xl:max-w-7xl py-16 md:py-28 md:px-12">
            <div className="flex items-center md:items-start flex-col space-y-5">
              <h1 className="text-3xl md:text-left md:text-6xl font-semibold w-3/4">Start Building on Ethereum</h1>
              <ul className="list-disc list-inside flex flex-col space-y-3">
                <li>7 start to finish tutorials </li>
                <li>Learn from the best Ethereum developers (+ guidance)</li>
                <li>Level Up your skill and get paid</li>
              </ul>
              <a
                href="https://speedrunethereum.com/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-accent btn-md md:self-start px-8"
              >
                Get Started Now!
              </a>
            </div>
            <div>
              <Image src="/assets/sre-forest.png" alt="hero" width={600} height={600} />
            </div>
          </div>
        </div>
        <div className="bg-[url(/assets/sre-path.png)] bg-repeat-x h-32 relative"></div>
      </div>
      {/* Test Your knowledge */}
      <div className="flex bg-base-100 -mt-16">
        <div className="flex justify-center items-center px-4 w-full">
          <div className="flex flex-col items-center justify-between w-full md:w-11/12 2xl:max-w-7xl py-16 md:py-28 md:px-12">
            <div className="flex flex-col-reverse md:flex-row md:self-start w-4/5 items-center">
              <div className="flex flex-col items-center md:items-start mt-6 md:mt-0">
                <h1 className="text-3xl md:text-5xl font-semibold text-center md:text-left">Test Your Knowledge</h1>
                <p className="text-center md:text-left w-3/4">
                  Copy about: Learn that you don’t know what you don’t know. you need to go through tour of duty + SRE
                  gets you into the BG ?
                </p>
              </div>
              <div>
                <Image src="/assets/dice.png" alt="hero" width={225} height={225} />
              </div>
            </div>
            {/*  */}
            {/* Cards container */}
            <div className="flex flex-wrap md:space-x-5 items-start justify-center">
              {/* Card */}
              <Card
                num={4}
                name={"Build a DEX"}
                src={"/assets/chall-dex.png"}
                description={
                  "💵 Build an exchange that swaps ETH to tokens and tokens to ETH. 💰 This is possible because"
                }
              />
              <Card
                num={6}
                name={"Multi-Sig Wallet"}
                src={"/assets/chall-multisig.png"}
                description={
                  "👩‍👩‍👧‍👧 Using a smart contract as a wallet we can secure assets by requiring multiple accounts to 'vote' on transactions."
                }
              />
              <Card
                num={5}
                name={"State Channels"}
                src={"/assets/chall-state.png"}
                description={
                  "🐌 The Ethereum blockchain has great decentralization & security properties. These properties come at a price"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
