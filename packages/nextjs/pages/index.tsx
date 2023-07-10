import Image from "next/image";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="">
        <Image src="/assets/hero.png" alt="BuidlGuidl hero image" className="absolute z-0 object-cover" fill />
      </div>
    </>
  );
};

export default Home;
