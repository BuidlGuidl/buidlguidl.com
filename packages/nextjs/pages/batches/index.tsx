import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "~~/components/Footer";
import { MetaHeader } from "~~/components/MetaHeader";
import TrackedLink from "~~/components/TrackedLink";

const NEXT_BATCH_NUMBER = 11;

// TODO: We can probably get rid of this when we grab the info from the BG app API
function getBatchNumber(batchName: string): number {
  const number = parseInt(batchName.replace("#", ""), 10);
  return isNaN(number) ? -1 : number;
}

const BATCH_CARDS_INFO = [
  {
    name: "#0",
    participants: 12,
    startDate: "12 Dec 23",
    batchPageLink: "https://batch0.buidlguidl.com/",
    githubRepoLink: "https://github.com/BuidlGuidl/batch0.buidlguidl.com",
  },
  {
    name: "#1",
    participants: 15,
    startDate: "15 Jan 24",
    batchPageLink: "https://batch1.buidlguidl.com/",
    githubRepoLink: "https://github.com/BuidlGuidl/batch1.buidlguidl.com",
  },
  {
    name: "#2",
    participants: 9,
    startDate: "13 Feb 24",
    batchPageLink: "https://batch2.buidlguidl.com/",
    githubRepoLink: "https://github.com/BuidlGuidl/batch2.buidlguidl.com",
  },
  {
    name: "#3",
    participants: 9,
    startDate: "05 Mar 24",
    batchPageLink: "https://batch3.buidlguidl.com/",
    githubRepoLink: "https://github.com/BuidlGuidl/batch3.buidlguidl.com",
  },
  {
    name: "#4",
    participants: 17,
    startDate: "08 Apr 24",
    batchPageLink: "https://batch4.buidlguidl.com/",
    githubRepoLink: "https://github.com/BuidlGuidl/batch4.buidlguidl.com",
  },
  {
    name: "#5",
    participants: 8,
    startDate: "06 May 24",
    batchPageLink: "https://batch5.buidlguidl.com/",
    githubRepoLink: "https://github.com/BuidlGuidl/batch5.buidlguidl.com",
  },
  {
    name: "#6",
    participants: 9,
    startDate: "03 Jun 24",
    batchPageLink: "https://batch6.buidlguidl.com/",
    githubRepoLink: "https://github.com/BuidlGuidl/batch6.buidlguidl.com",
  },
  {
    name: "#7",
    participants: 7,
    startDate: "08 Jul 24",
    batchPageLink: "https://batch7.buidlguidl.com/",
    githubRepoLink: "https://github.com/BuidlGuidl/batch7.buidlguidl.com",
  },
  {
    name: "#8",
    participants: 10,
    startDate: "06 Aug 24",
    batchPageLink: "https://batch8.buidlguidl.com/",
    githubRepoLink: "https://github.com/BuidlGuidl/batch8.buidlguidl.com",
  },
  {
    name: "#9",
    participants: 14,
    startDate: "09 Sep 24",
    batchPageLink: "https://batch9.buidlguidl.com/",
    githubRepoLink: "https://github.com/BuidlGuidl/batch9.buidlguidl.com",
    openseaLink: "https://opensea.io/collection/batchgraduate-1",
  },
  {
    name: "#10",
    participants: 11,
    startDate: "14 Oct 24",
    batchPageLink: "https://batch10.buidlguidl.com/",
    githubRepoLink: "https://github.com/BuidlGuidl/batch10.buidlguidl.com",
  },
].sort((a, b) => getBatchNumber(b.name) - getBatchNumber(a.name));

// Custom header for the batches pagesince the "Go to app" button is different
const BatchesHeader = () => {
  return (
    <div className="navbar min-h-0 flex-shrink-0 justify-between px-0 py-4 pb-8 md:pb-4 sm:px-2 bg-[#EFFBCA]">
      <div className="navbar-start w-auto lg:w-1/2">
        <Link href="/" passHref className="flex items-center gap-2 ml-4 mr-6">
          <div className="flex relative w-[130px] md:w-[150px] h-[36px]">
            <Image alt="BuidlGuidl logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
        </Link>
      </div>
      <div className="navbar-end flex-grow mr-4 space-x-6 z-10">
        <TrackedLink
          id="buidlguidl:app"
          href="https://app.buidlguidl.com"
          className="btn btn-primary bg-info hover:border-info text-[#182232] btn-xs md:btn-sm md:px-5 hover:opacity-100"
        >
          Go to app
        </TrackedLink>
      </div>
    </div>
  );
};

const Batches = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = BATCH_CARDS_INFO.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(BATCH_CARDS_INFO.length / itemsPerPage);

  return (
    <>
      <MetaHeader
        title="BuidlGuidl Batches | Level Up Your Web3 Skills"
        description="Explore BuidlGuidl Batches to enhance your skills as a web3 developer. Join our program and collaborate with other Ethereum builders."
      />
      {/* Hero section with custom header */}
      <div className="relative flex flex-col items-center pb-48">
        <div className="absolute inset-0 bg-gradient-to-b from-[#EAFFA9] via-[#f3ffca] to-[#EDEFFF]"></div>
        <div className="absolute inset-0 bg-[url(/assets/bg-batches-train.png)] bg-contain bg-no-repeat bg-bottom opacity-30 xl:hidden"></div>
        <BatchesHeader />
        <div className="container relative flex items-center max-w-[90%] lg:max-w-6xl px-4 py-16 min-h-[60vh] lg:py-20 lg:px-32">
          <div className="space-y-4 z-10 relative">
            <Image src="/assets/bg-batches-onboarding.svg" alt="BG Onboarding" width={330} height={200} priority />
            <div className="relative">
              <Image src="/assets/bg-batches-text.svg" alt="Batches text" width={700} height={400} priority />
              <div className="absolute -top-32 -right-96 hidden xl:block">
                <Image src="/assets/bg-batches-train.png" alt="BG Train" width={600} height={500} priority />
              </div>
            </div>
            <h3 className="pt-2 text-xl">From beginner to expert in dApp development</h3>
          </div>
        </div>
      </div>

      {/* What are BG Batches */}
      <div className="bg-[#EEF0FE] py-16 lg:py-24 " id="what-are-batches">
        <div className="container max-w-[90%] lg:max-w-6xl mx-auto px-4 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="text-center md:text-left lg:w-1/2 space-y-6">
              <h2 className="text-3xl lg:text-5xl font-bold">What are BuidlGuidl Batches?</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  BuidlGuidl Batches is a program designed for builders who have completed Speedrun Ethereum. It&apos;s
                  the next step in your journey as a web3 developer, offering additional challenges and skills to
                  enhance your abilities.
                </p>
                <p>
                  After completing the program, you&apos;ll be equipped with both technical and social skills that will
                  help you collaborate more effectively in the web3 ecosystem.
                </p>
                <ul className="text-left list-disc list-inside">
                  <li>Complimentary challenges to Speedrun Ethereum</li>
                  <li>Mentorship on contributing to open source projects on GitHub</li>
                  <li>Open source etiquette and best practices</li>
                  <li>Real-world building Experience</li>
                </ul>
              </div>
            </div>
            <div className="lg:w-1/2">
              <Image
                src="/assets/bg-batches-castle.png"
                alt="BG Batches Castle"
                width={600}
                height={600}
                className="w-full h-auto object-contain max-w-[300px] lg:max-w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* How Batches Work */}
      <div className="bg-[#EBFFA9] py-16 lg:py-24">
        <div className="container max-w-[90%] lg:max-w-6xl mx-auto px-4 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-center md:text-left text-3xl lg:text-5xl font-bold">How do Batches work?</h2>
              <div className="space-y-4 text-gray-700">
                <ul className="list-disc list-inside">
                  <li>Each batch has its own GitHub repository</li>
                  <li>Collaborate with peers and mentors in a dedicated Telegram group</li>
                  <li>Complete challenges and contribute to open source projects</li>
                  <li>Build a final project and apply for a grant!</li>
                </ul>
              </div>
            </div>
            <div className="lg:w-1/2">
              <Image
                src="/assets/bg-batches-how-batches-work.png"
                alt="How Batches Work Illustration"
                width={600}
                height={600}
                className="w-full h-auto object-contain max-w-[300px] lg:max-w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Batch Table and CTA */}
      <div className="bg-[#EDEFFF] pt-16 lg:pt-24 pb-16">
        <div className="container max-w-[90%] lg:max-w-6xl mx-auto px-4 lg:px-12">
          <div className="flex justify-center items-center mb-8">
            <Image src={"/assets/bg-batches-winners.svg"} alt={"Winners"} width={50} height={50} className="mr-3" />
            <h2 className="text-center md:text-left text-3xl lg:text-5xl font-bold mb-0">Explore our batches</h2>
          </div>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Join a BuidlGuidl Batch to enhance your skills and collaborate with other web3 developers.
          </p>
          <div className="mt-0 lg:mt-8 max-w-[90%] md:max-w-[75%] xl:max-w-[60%] mx-auto">
            <div className="hidden xs:block">
              <table className="min-w-full">
                <thead>
                  <tr className="text-base text-center">
                    <th className="py-3 px-4">Batch</th>
                    <th className="py-3 px-4 hidden lg:table-cell">Start Date</th>
                    <th className="py-3 px-4 hidden sm:table-cell">Participants</th>
                    <th className="py-3 px-4">Links</th>
                  </tr>
                </thead>
                <tbody className="shadow-even rounded-3xl text-sm">
                  {currentItems.map((batch, index) => (
                    <tr key={index} className="bg-white border-b border-base-100 text-center">
                      <td className="py-3 px-4">{batch.name}</td>
                      <td className="py-3 px-4 hidden lg:table-cell">{batch.startDate}</td>
                      <td className="py-3 px-4 hidden sm:table-cell">{batch.participants}</td>
                      <td className="py-3 px-4">
                        <div className="flex justify-left items-center gap-2">
                          <TrackedLink
                            id={`${batch.name}-page`}
                            href={batch.batchPageLink}
                            className="btn btn-xs btn-primary text-white hover:opacity-80"
                          >
                            Website
                          </TrackedLink>
                          <TrackedLink
                            id={`${batch.name}-github`}
                            href={batch.githubRepoLink}
                            className="btn btn-xs btn-ghost p-0 min-h-0 w-[24px] h-[24px] hover:opacity-80 flex items-center justify-center align-middle"
                          >
                            <Image src="/assets/github-logo.png" alt="GitHub" width={24} height={24} />
                          </TrackedLink>
                          {batch.openseaLink && (
                            <TrackedLink
                              id={`${batch.name}-opensea`}
                              href={batch.openseaLink}
                              className="btn btn-xs btn-ghost p-0 min-h-0 w-[24px] h-[24px] hover:opacity-80 flex items-center justify-center align-middle"
                            >
                              <Image src="/assets/opensea-logo.svg" alt="OpenSea" width={24} height={24} />
                            </TrackedLink>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`mx-1 px-3 py-1 rounded ${
                        currentPage === index + 1 ? "bg-primary text-white" : "bg-gray-200"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Next Batch CTA */}
          <div className="mt-8 card bg-gradient-to-r from-primary to-secondary px-6 lg:pl-6 py-6 max-w-[90%] md:max-w-[75%] xl:max-w-[60%] mx-auto">
            <div className="card-body p-0 flex flex-col lg:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0 max-w-full lg:max-w-[55%] text-center lg:text-left">
                <h3 className="card-title text-2xl text-white mb-2 justify-center lg:justify-start">
                  Batch #{NEXT_BATCH_NUMBER}
                </h3>
                <p className="text-white pr-2">
                  Complete SpeedRunEthereum and join BuidlGuidl to participate in the next Batch!
                </p>
              </div>
              <TrackedLink
                id="apply-next-batch"
                href="https://speedrunethereum.com/"
                className="btn btn-sm bg-white text-primary hover:bg-gray-100 transition-colors duration-300 inline-flex items-center justify-center whitespace-nowrap mr-10"
              >
                Go SpeedRunEthereum
              </TrackedLink>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Batches;
