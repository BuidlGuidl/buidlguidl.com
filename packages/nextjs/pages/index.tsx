import Image from "next/image";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="">
        <Image src="/assets/hero.png" layout="fill" objectFit="cover" alt="hero image" className="absolute z-0" />
      </div>
    </>
  );
};

export default Home;
