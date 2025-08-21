import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BatchCta } from "../../components/batches/BatchCta";
import { Card } from "../../components/batches/Card";
import { formatDate } from "../../utils/batches/formatDate";
import type { GetStaticProps } from "next";
import { Chain, createPublicClient, http } from "viem";
import { arbitrum, optimism } from "viem/chains";
import { Footer } from "~~/components/Footer";
import { MetaHeader } from "~~/components/MetaHeader";
import TrackedLink from "~~/components/TrackedLink";

const BATCH_GRADUATION_NFT_FUNCTION_ABI = [
  {
    inputs: [],
    name: "batchGraduationNFT",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

interface BatchData {
  id: number;
  name: string;
  status: "open" | "closed";
  startDate: string;
  contractAddress: string;
  bgSubdomain: string;
  totalParticipants?: number;
  graduates?: number;
  // Computed fields
  batchPageLink?: string;
  githubRepoLink?: string;
  nftContractAddress?: string | null;
  network?: string;
}

function getBatchNumber(batchName: string): number {
  const match = batchName.match(/Batch\s+(\d+)/i);
  if (match) {
    return parseInt(match[1], 10);
  }
  return -1;
}

interface PageProps {
  batchData: BatchData[];
  openBatchNumber: number | null;
  openBatchStartDate: string | null;
}

// Custom header for the batches page since the "Go to app" button is different
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

const Batches = ({ batchData, openBatchNumber, openBatchStartDate }: PageProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredBatchData = batchData.filter(batch => batch.status === "closed");

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBatchData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredBatchData.length / itemsPerPage);

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
            <h3 className="pt-2 text-xl">From beginner to expert in open source dApp development</h3>
          </div>
        </div>
      </div>

      {/* What are BG Batches */}
      <div className="bg-[#EEF0FE] py-16 lg:py-24 " id="what-are-batches">
        <div className="container max-w-[90%] lg:max-w-6xl mx-auto px-4 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="text-center md:text-left lg:w-1/2 space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold ">What are BuidlGuidl Batches?</h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg mb-10">
                  BuidlGuidl Batches is a program designed for builders who have completed Speedrun Ethereum. It&apos;s
                  the next step in your journey as a web3 developer! 🚀
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <Card
                    icon="🌐"
                    title="Open-Source in Web3"
                    description="Take your first steps into web3 open-source development."
                  />
                  <Card
                    icon="🔧"
                    title="GitHub Contributions"
                    description="Learn to submit PRs, manage issues, and review code effectively."
                  />
                  <Card
                    icon="✨"
                    title="Build Apps"
                    description="Create a web3 app collaboratively with other builders."
                  />
                  <Card
                    icon="🛠️"
                    title="Solidity Skills"
                    description="Refine and practice your Solidity skills with further challenges."
                  />
                </div>
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

          {/* Next Batch CTA */}
          <BatchCta openBatchNumber={openBatchNumber} openBatchStartDate={openBatchStartDate} />
        </div>
      </div>

      <div className="-mt-12 bg-[url(/assets/sre-path.png)] bg-repeat-x h-20 bg-[center_top]"></div>

      {/* What you'll learn */}
      <div className="base-200 py-16 lg:py-24">
        <div className="container max-w-[90%] lg:max-w-6xl mx-auto px-4 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="lg:w-1/2">
              <Image
                src="/assets/funding.png"
                alt="How Batches Work Illustration"
                width={600}
                height={600}
                className="w-full h-auto object-contain max-w-[300px] lg:max-w-full"
              />
            </div>
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-center md:text-left text-3xl lg:text-5xl font-bold">What you&apos;ll learn?</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-4 p-4">
                  <h3 className="text-xl font-semibold">🚀 GitHub Mastery</h3>
                  <ul className="space-y-2">
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>Submit your first PR the right way</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>Create and manage issues effectively</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>Review code from fellow participants</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>Open-source etiquette and best practices</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4 p-4">
                  <h3 className="text-xl font-semibold">⚡ Technical Growth</h3>
                  <ul className="space-y-2">
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>Complementary challenges to Speedrun Ethereum</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>Real-world building experience</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>Mentorship on contributing to open-source projects</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>Technical and social skills for web3 collaboration</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-10"> */}

      {/* How Batches Work */}
      <div className="bg-[#EBFFA9] py-16 lg:py-24">
        <div className="container max-w-[90%] lg:max-w-6xl mx-auto px-4 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-center md:text-left text-3xl lg:text-5xl font-bold">How do Batches work?</h2>
              <div className="space-y-4">
                <div className="grid gap-10">
                  <Card
                    icon="📚"
                    title="GitHub Repository"
                    description="Each batch has its own dedicated repository for collaboration"
                  />
                  <Card
                    icon="💬"
                    title="Community Support"
                    description="Connect with peers and mentors in a dedicated Telegram group"
                  />
                  <Card
                    icon="🎯"
                    title="Learning Journey"
                    description="Complete challenges and contribute to open source projects"
                  />
                  <Card
                    icon="🚀"
                    title="Final Project"
                    description="Build your project and get a chance to receive a grant!"
                  />
                </div>
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

      {/* CTA and the batch table */}
      <div className="bg-[#EDEFFF] pt-16 lg:pt-8 pb-16">
        <div className="container max-w-[90%] lg:max-w-6xl mx-auto px-4 lg:px-12">
          {/* Next Batch CTA */}
          <BatchCta openBatchNumber={openBatchNumber} openBatchStartDate={openBatchStartDate} />

          <div className="flex justify-center items-center mb-8">
            <Image src={"/assets/bg-batches-winners.svg"} alt={"Winners"} width={50} height={50} className="mr-3" />
            <h2 className="text-center md:text-left text-3xl lg:text-5xl font-bold mb-0">Explore our batches</h2>
          </div>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Join a BuidlGuidl Batch to enhance your skills and collaborate with other web3 developers.
          </p>
          <div className="mt-0 lg:mt-8 max-w-full xs:max-w-[90%] md:max-w-[75%] xl:max-w-[60%] mx-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-base text-center">
                  <th className="py-3 px-2 xs:px-4">Batch</th>
                  <th className="py-3 px-2 xs:px-4 hidden lg:table-cell">Start Date</th>
                  <th className="py-3 px-2 xs:px-4 hidden sm:table-cell">Participants</th>
                  <th className="py-3 px-2 xs:px-4 hidden sm:table-cell">Graduates</th>
                  <th className="py-3 px-2 xs:px-4">Links</th>
                </tr>
              </thead>
              <tbody className="shadow-even rounded-3xl text-sm">
                {currentItems.map((batch, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b border-base-100 text-center last:rounded-b-3xl last:border-none"
                  >
                    <td className="py-3 px-2 xs:px-4">{batch.name}</td>
                    <td className="py-3 px-2 xs:px-4 hidden lg:table-cell">{formatDate(batch.startDate)}</td>
                    <td className="py-3 px-2 xs:px-4 hidden sm:table-cell">{batch.totalParticipants}</td>
                    <td className="py-3 px-2 xs:px-4 hidden sm:table-cell">{batch.graduates || "-"}</td>
                    <td className="py-3 px-2 xs:px-4">
                      <div className="flex justify-center">
                        <div className="w-[120px] flex items-center gap-2">
                          <TrackedLink
                            id={`${batch.name}-page`}
                            href={batch.batchPageLink || ""}
                            className="btn btn-xs btn-primary text-white hover:opacity-80"
                          >
                            Website
                          </TrackedLink>
                          <div className="flex items-center gap-1">
                            {batch.nftContractAddress && batch.graduates && batch.graduates > 0 ? (
                              <TrackedLink
                                id={`${batch.name}-opensea`}
                                href={`https://opensea.io/assets/${batch.network}/${batch.nftContractAddress}`}
                                className="btn btn-xs btn-ghost p-0 min-h-0 w-[24px] h-[24px] hover:opacity-80 flex items-center justify-center"
                              >
                                <Image src="/assets/opensea-logo.svg" alt="OpenSea" width={24} height={24} />
                              </TrackedLink>
                            ) : null}
                          </div>
                        </div>
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
      </div>
      <Footer />
    </>
  );
};

const getNftContractAddress = async (contractAddress: string, network: string) => {
  let chain: Chain;
  if (network === "optimism") {
    chain = optimism;
  } else if (network === "arbitrum") {
    chain = arbitrum;
  } else {
    throw new Error("Unsupported network");
  }
  let nftContractAddress: string | null = null;
  try {
    const publicClient = createPublicClient({
      chain: chain as Chain,
      transport: http(),
    });

    nftContractAddress = await publicClient.readContract({
      address: contractAddress,
      abi: BATCH_GRADUATION_NFT_FUNCTION_ABI,
      functionName: "batchGraduationNFT",
    });
  } catch (error) {
    console.error("Error reading NFT contract:", error);
  }
  return nftContractAddress;
};

const getNftContractAddressForBatch = async (batch: BatchData) => {
  if (!batch.contractAddress || !batch.network) {
    return null;
  }
  const nftContractAddress = await getNftContractAddress(batch.contractAddress, batch.network);
  return nftContractAddress;
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_BATCHES_API || "https://speedrunethereum.com";
    const batchesResponse = await fetch(`${API_BASE}/api/batches/public`);

    if (!batchesResponse.ok) {
      throw new Error(`Failed to fetch batches: ${batchesResponse.status} ${batchesResponse.statusText}`);
    }

    const batchesData: BatchData[] = await batchesResponse.json();

    const openBatch = batchesData.find(batch => batch.status === "open");
    const openBatchNumber = openBatch ? getBatchNumber(openBatch.name) : null;
    const openBatchStartDate = openBatch ? openBatch.startDate : null;

    const batchesWithNftAddresses = await Promise.all(
      batchesData.map(async batch => {
        const nftContractAddress = await getNftContractAddressForBatch(batch);
        return {
          ...batch,
          batchPageLink: `https://${batch.bgSubdomain}.buidlguidl.com/`,
          githubRepoLink: `https://github.com/BuidlGuidl/${batch.bgSubdomain}.buidlguidl.com`,
          graduates: batch.graduates,
          network: batch.network,
          nftContractAddress: nftContractAddress || null,
        };
      }),
    );

    const sortedBatches = batchesWithNftAddresses.sort((a, b) => b.id - a.id);

    return {
      props: {
        batchData: sortedBatches,
        openBatchNumber: openBatchNumber,
        openBatchStartDate,
      },
      // 6 hours refresh
      revalidate: 21600,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        batchData: [],
        openBatchNumber: null,
        openBatchStartDate: null,
      },
      revalidate: 21600,
    };
  }
};

export default Batches;
