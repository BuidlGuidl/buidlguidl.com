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
    </>
  );
};

export default Home;
