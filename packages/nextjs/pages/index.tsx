import Image from "next/image";
import type { NextPage } from "next";
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
          <h1 className="text-center text-4xl md:text-6xl mt-4 max-w-lg font-bold">Welcome to the BuidlGuidl</h1>
        </div>
      </div>
      {/* Star Building on Ethereum */}
      <div className="bg-white flex justify-center items-center bg-[url(/assets/sre-path.png)] bg-bottom bg-no-repeat pb-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between w-3/4 2xl:max-w-7xl py-8">
          <div className="flex items-center md:items-start flex-col space-y-5">
            <h1 className="text-3xl md:text-left md:text-5xl font-semibold w-3/4">Start Building on Ethereum</h1>
            <ul className="list-disc list-inside flex flex-col space-y-3">
              <li>7 start to finish tutorials </li>
              <li>Learn from the best Ethereum developers (+ guidance)</li>
              <li>Level Up your skill and get paid</li>
            </ul>
            <button className="btn btn-accent btn-md md:self-start px-8">Get Started Now!</button>
          </div>
          <div>
            <Image src="/assets/sre-forest.png" alt="hero" width={400} height={400} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
