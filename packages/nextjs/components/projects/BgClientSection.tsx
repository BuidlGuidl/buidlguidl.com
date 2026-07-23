import Image from "next/image";
import TrackedLink from "~~/components/TrackedLink";

export const BgClientSection = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto lg:max-w-7xl">
        <div className="container max-w-[90%] lg:max-w-7xl m-auto py-16 lg:py-20 xl:pl-24 lg:pl-16 flex flex-col-reverse lg:flex-row items-center gap-5 lg:gap-0">
          <div className="space-y-6 md:max-w-[70%] lg:max-w-[40%] flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-2xl lg:text-4xl xl:text-5xl">
              BuidlGuidl <br /> {'"Client"'}
            </h2>
            <p className="m-0 lg:pr-8 mb-3">One line command to run an Ethereum full node!</p>
            <div className="flex gap-6 mt-8">
              <TrackedLink
                id="BG-Nodes"
                href="https://client.buidlguidl.com"
                className="btn btn-md btn-secondary px-8 hover:opacity-100"
              >
                Run Ethereum
              </TrackedLink>
              <Image src="/assets/bg-client-logo.svg" alt="BG Client logo" width={150} height={150} />
            </div>
          </div>
          <div className="flex flex-col items-center lg:pl-16 xl:pl-12 2xl:pl-24 lg:-mr-12 xl:-mr-16 2xl:-mr-24">
            <div className="max-w-md lg:max-w-md xl:max-w-xl 2xl:max-w-2xl">
              <Image src="/assets/bg-client-2.png" alt="BG Client running on a computer" width={700} height={700} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
