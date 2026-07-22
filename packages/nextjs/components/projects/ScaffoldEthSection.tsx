import Image from "next/image";
import TrackedLink from "~~/components/TrackedLink";
import { PROJECTS } from "~~/utils/projects";

const METRICS = PROJECTS.find(project => project.name === "Scaffold-ETH 2")?.metrics ?? [];

// prevBg must match the section above: the pixel divider is pulled up into it.
export const ScaffoldEthSection = ({ prevBg }: { prevBg: string }) => {
  return (
    <div className="bg-[#FFD2B3]">
      <div className={`-mt-12 bg-repeat-x h-20 bg-[35%_top] ${prevBg}`}></div>
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
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-start">
            <TrackedLink
              id="Scaffold-ETH-2"
              href="https://scaffoldeth.io"
              className="btn btn-accent btn-md px-8 hover:opacity-100"
            >
              Start using SE-2
            </TrackedLink>
            {METRICS.map(metric => (
              <div
                key={metric.label}
                className="relative bg-white border border-accent/40 text-accent rounded-full px-4 py-2 text-sm whitespace-nowrap"
              >
                {/* Speech-bubble tail pointing back at the CTA (daisyUI 2 has no chat-bubble). */}
                <span className="hidden lg:block absolute -left-[5px] top-1/2 -translate-y-1/2 rotate-45 w-2.5 h-2.5 bg-white border-l border-b border-accent/40" />
                <span className="font-bold">{metric.value}</span> {metric.label}
              </div>
            ))}
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
  );
};
