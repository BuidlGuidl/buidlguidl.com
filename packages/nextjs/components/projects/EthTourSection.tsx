import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TrackedLink from "~~/components/TrackedLink";

// Airship drifts up as the section crosses the viewport: +40px on entry, -40px on exit.
const DRIFT = 80;

export const EthTourSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const { top, height } = section.getBoundingClientRect();
      const progress = (window.innerHeight - top) / (window.innerHeight + height);
      setOffset((0.5 - Math.min(Math.max(progress, 0), 1)) * DRIFT);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-[url(/assets/background-clouds-mobile.png)] lg:bg-[url(/assets/background-clouds.png)] bg-no-repeat bg-cover bg-center overflow-hidden"
    >
      <div className="container max-w-[80%] lg:max-w-6xl m-auto py-10 lg:py-14 lg:px-12 flex flex-col-reverse lg:flex-row items-center justify-between gap-5 lg:gap-0">
        <div className="space-y-6">
          <div className="hidden lg:block mb-4">
            <Image src="/assets/eth-logo.svg" alt="Ethereum logo" width={48} height={48} />
          </div>
          <h2 className="text-3xl lg:text-5xl lg:w-3/4 text-center lg:text-left">Ethereum on Tour</h2>
          <p className="text-center lg:text-left">
            Bringing Ethereum curriculum, <br /> tools, and mentorship to you!
          </p>
          <div className="text-center lg:text-left">
            <TrackedLink
              id="Eth Tour website"
              href="https://tour.buidlguidl.com"
              className="btn btn-primary btn-md lg:self-start px-8 rounded-full hover:opacity-100"
            >
              See our next dates
            </TrackedLink>
          </div>
        </div>
        <div
          className="flex flex-col items-center max-w-[400px] mr-6 lg:mr-0 lg:max-w-none lg:pr-10"
          style={{ transform: `translateY(${offset}px)`, transition: "transform 0.1s ease-out" }}
        >
          <Image src="/assets/airship.png" alt="Eth Tour airship" width={500} height={500} />
        </div>
      </div>
    </div>
  );
};
