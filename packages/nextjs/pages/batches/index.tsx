import Image from "next/image";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { MetaHeader } from "~~/components/MetaHeader";
import TrackedLink from "~~/components/TrackedLink";
import { Address } from "~~/components/scaffold-eth";

const batchBuilders: Record<number, string[]> = {
  1: [
    "0x1CeF0e6072810013487f7632350f9336AD6CADAD",
    "0x2b30efBA367D669c9cd7723587346a79b67A42DB",
    "0x4f099cFbC4043e60c52EF47EBC593ba0Bda5C85e",
    "0x5D70E3b540f58beCd10B74f6c0958b31e3190DA7",
    "0x3b529ac4F8dc0C40Fec0f1192029755275A0c3Cd",
    "0xbE7fD3889C01F032184544DC0005F0d47daCcf09",
    "0xDE5c8eAFEBEC017D9d26F757B9d7F04A0C1eb177",
    "0xC6e64eBeFaFaB3d646adadca5D93A7c44f62544f",
    "0x55fF7E28e7cd43C104dC89Aa69285E0E6EBa064e",
    "0x2F142f9F52af0845B7b8b1353E349Ca1Cb8EFE92",
    "0x4d639cbbc15fE5DB467dbF158a78a5Fa3Ac20877",
    "0x8757F328371E571308C1271BD82B91882253FDd1",
    "0x2B602d2f559a0bADf4D5956D03f2b330fBC2e9F9",
  ],
  2: [
    "0x6A5eE38133C24B315bb03603A00bec1b9b34fAA4",
    "0xAA87E8feDc5B7aCc46eE5BB12Af8E866e7C0c306",
    "0x78b0DCCE8F4367e2Fd514bF428aDfaFBCB15101C",
    "0xdb253953AeD478908635De50CC49C35619bcE04E",
  ],
  3: [
    "0xc26816404F551a7b3964B0D665380e9e3aca17b3",
    "0x5f2AF68dF96F3e58e1a243F4f83aD4f5D0Ca6029",
    "0x2Abdb157b2603e17d531d4fc51a4fc6174c3dAEA",
  ],
  4: [
    "0xF99aF52Ab7bbd7535797538946aBa7958a2DAD8c",
    "0xd4A9f1f16c971f68FeF19882CBC019E616A85095",
    "0xc2564e41B7F5Cb66d2d99466450CfebcE9e8228f",
    "0xFFf6a812685f045acE23A65312ca9B1F506cC67d",
    "0xb8d9f70A391c0cD30D04Ee7D209E326659604c5b",
    "0x4EAB594cD1eeCC078eA96D46c7827D72466e2e28",
    "0x2Ca3355E6e09e54bE4A70F44d6709DABA08fC786",
    "0xeA2f0BB0144fbff64E6f6F492B999674f9393882",
    "0xF3b64dD5AF39d8fF0c614F7637e339e31466c4C3",
    "0xa63f3deC58506f43B721025ae9cBAd9F4F7C658a",
    "0xF11046328814004583c8e74050f0d59520f53e90",
    "0xADAa82d99Ca31379EC8417515A75A7ce3A4b4044",
    "0x822e7a7209d6C3Da71979AD443D1D3e81E78e2FD",
    "0xb4Df20693EE59D64d8CCF828d8Aa0b88f4fC73eA",
    "0x95E08FA8ac4301acC5b943f860Cd8AC84433e3CF",
    "0x2723A2756ecb99b3B50f239782876fB595728AC0",
    "0x396E5C4EC6965b46Ff95d71f0cBF219d19DD5071",
    "0x59a04ed7D9Eb8c7B1A7958678D36f1dC2a13E096",
  ],
  5: [
    "0x97DB651f21639C4F6b0997184373b9d21179C157",
    "0x981ab0D817710d8FFFC5693383C00D985A3BDa38",
    "0xbFbccAd69D2B42339674F4988Bf5f200fBDe3004",
    "0x53ef6ab45bB7AeE55869976d329C66B65675eF84",
    "0x872f1fFdeEe35a6074658B4FB185E2582Db7896A",
    "0x4e97cE84631F7EF26B43F66a0623F00261EdfD6e",
    "0x2b2542b313385AF7453623765383CE3cc5D3c9cF",
    "0x83DD842BB14aacE72A1a68a129D134Ee3EeBbbd4",
  ],
  6: [
    "0x13d4A0cB82e1Fa2982407B16a2D031d4E2410ab1",
    "0x4b2b0D5eE2857fF41B40e3820cDfAc8A9cA60d9f",
    "0xDbD3834299D363B4Fb84Aef9309d3068E52CFc0C",
    "0x9B28C43d4526202c316b9ab0ECCB757C4D9c5155",
    "0x472cAde746560419a407CA7103c87c79c794C418",
    "0x84fF709680E9378734Bae1D3B55C6568d21671c3",
    "0x09D577A4BC5422bf724ADe3735E22d7C6c8B7698",
    "0x2787b58E6c7c9e0C824f2187BA99a2076B23491c",
    "0x033ebeaBCC05eBaF5628b7bDDfacaDF1426efAA4",
    "0x5b240A6F86a180C795ab1328F2F3567d113DEF26",
  ],
  7: [
    "0x5E71Cd371cD497A164da8f97aeb853efD160F5f5",
    "0x8488B81757074B0558ebB05D59A81F43F55bf0C8",
    "0xA99DE99C77C51777234e526f87681F38E4AB073A",
    "0xDE26619C377F3BE82EeC1ef59aAD46a20681DAD7",
    "0x423775bd841f9d3c3120c103A14a64EBc7B4F40A",
    "0x798E07432440e382300784d6226Ef393669FEdb4",
    "0x61F4c9bB022dFF50d213F007E6b5004b54543E3C",
    "0x8EC90502356657Cc30f22444A8e073FE89322333",
    "0x97d45F88468289ac299B79cF01bbB6f218c46230",
    "0x726F186C449c58B07EfD0d1490B79F80843C2dB7",
  ],
  8: [
    "0xF25f95C59f4f1C4010527DAa26e7974cB37c2Ae1",
    "0x3566ce434c0d8B80934354c806f8651e1cC91EDD",
    "0x4a9A95B6fe3b9416f0c78A8735Aa075c75AF46a4",
    "0x8eE31084d2914fA84Baae3460093564934837898",
    "0xBC428Bb80B1cc3C29164820528819Abf6b20cB88",
    "0x80Ad2861Ab5D4EeA61330A4bd7d6969357C463C3",
    "0xfb8b972b0D1cF9BB242A40F7AEA8E9a1bF89E0E3",
    "0xd1B41bE30F980315b8A6b754754aAa299C7abea2",
    "0xD2692F9df925D18D527ABe8b3d99EE9E9C8d75AE",
    "0x357bc010520575Ea5720aC3F7cb48fcedfc711Ed",
  ],
  9: [
    "0x059E31Ea8A88b62FE1603CCE134eF7c1cC557395",
    "0xeBFd549b62b1A018f86a931A949656B811FF2eC1",
    "0x5D56b71abE6cA1Dc208Ed85926178f9758fa879c",
    "0xaa4C60b784E2b3E485035399bF1b1aBDeD66A60f",
    "0x4D44e5b5E2B2A56b81F2e94850e0802B0319e9F0",
    "0xcefb233406133224AE9b19444d836F6a33593F13",
    "0x6d3321b4637D8451740Cf400848602f838F7A594",
    "0x021584e57b2219957784951639385027607266e6",
    "0xD0CA897A8A50502802Df62A712Da92FA26Be9bD5",
    "0xB9784f1A5D59779a4df0D36453284f8457E53bDE",
    "0xDFbE6c0A54F9f4f758753aE56eDD02Dd92C29be3",
  ],
};

const Batches = () => {
  return (
    <>
      <MetaHeader
        title="BuidlGuidl Batches"
        description="Level up your skills as a web3 developer with BuidlGuidl Batches!"
      />
      {/* Hero section with header */}
      <div className="relative flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-b from-[#EAFFA9] via-[#EDEFFF] to-white"></div>
        <div className="absolute inset-0 bg-[url(/assets/batches-bg.png)] bg-contain bg-no-repeat bg-center opacity-30 lg:hidden"></div>
        <Header />
        <div className="relative flex-grow flex items-center justify-center">
          <div className="container max-w-[90%] lg:max-w-6xl mx-auto px-4 py-16 lg:py-20 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-0">
            <div className="lg:text-left space-y-5 ">
              <Image
                src="/assets/batches-logo-3.svg"
                alt="BG Onboarding batches"
                width={375}
                height={50}
                className="lg:mx-0 w-3/4"
              />
              <h1 className="text-3xl lg:text-6xl font-bold text-[#182232] leading-tight">
                From beginner to
                <br />
                expert in dApp
                <br />
                developing
              </h1>
              <ul className="space-y-2 text-gray-700  mx-auto lg:mx-0 text-left lg:text-left">
                <li>• Become proficient in designing, building and launching dApps</li>
                <li>• Participate actively in open-source projects</li>
                <li>• Learn how to collaborate effectively with fellow developers</li>
                <li>• Contribute to GitHub repositories, handle issues and pull requests (PRs)</li>
                <li>• Learn best practices in version control</li>
              </ul>
            </div>
            <div className=" hidden lg:block">
              <Image src="/assets/batches-bg.png" alt="Batches illustration" width={500} height={400} />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[url(/assets/sre-path.png)] bg-repeat-x h-32  bg-[35%_top] bg-white"></div>

      {/* What are BuidlGuidl Batches */}
      <div className="bg-base-100 -mt-16" id="what-are-batches">
        <div className="container max-w-[90%] lg:max-w-6xl mx-auto px-4 py-16 lg:py-20 lg:px-12 flex flex-col lg:flex-row items-center gap-5 lg:gap-0">
          <div className="space-y-6 lg:w-1/2">
            <h2 className="text-3xl lg:text-5xl text-center lg:text-left">What are BuidlGuidl Batches?</h2>
            <p className="text-center md:text-left text-lg leading-8 text-gray-600">
              BuidlGuidl Batches is a program designed for builders who have completed Speedrun Ethereum. It&apos;s the
              next step in your journey as a web3 developer, offering additional challenges and skills to enhance your
              abilities.
            </p>
            <h3 className="text-2xl font-semibold">Why Join a Batch?</h3>
            <p className="text-gray-600 text-center md:text-left">
              BuidlGuidl Batches is like{" "}
              <a href="https://missing.csail.mit.edu/" target="_blank" rel="noopener noreferrer" className="link">
                &quot;The Missing Semester of Your CS Education&quot;
              </a>
              , but tailored for onchain developers. After completing the program, you&apos;ll be equipped with both
              technical and social skills that will help you collaborate more effectively in the web3 ecosystem.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Challenges beyond Speedrun Ethereum</li>
              <li>Mentorship on contributing to open source projects on GitHub</li>
              <li>Open source etiquette and best practices</li>
              <li>Learn Git and Open Source Etiquette</li>
              <li>Advanced Smart Contract Interactions</li>
              <li>Real-world Project Experience</li>
            </ul>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <Image src="/assets/sre-forest.png" alt="SpeedrunEthereum" width={500} height={500} />
          </div>
        </div>
      </div>

      {/* How Batches Work */}
      <div className="bg-base-200">
        <div className="container max-w-[90%] lg:max-w-6xl mx-auto px-4 py-16 lg:py-20 lg:px-12">
          <h2 className="text-2xl lg:text-5xl text-center mb-8">How BuidlGuidl Batches Work</h2>
          <div className="flex flex-col-reverse lg:flex-row items-center gap-5 lg:gap-12">
            <div className="space-y-6 lg:w-1/2">
              <ul className="list-disc list-outside flex flex-col space-y-3 pl-8 lg:pl-4">
                <li>Each batch has its own GitHub repository</li>
                <li>Participants deploy smart contracts to interact with a batch contract</li>
                <li>Collaborate with peers and mentors in a dedicated Telegram group</li>
                <li>Complete challenges and contribute to open source projects</li>
              </ul>
            </div>
            <div className="flex flex-col items-center lg:w-1/2">
              <div className="max-w-[400px] lg:max-w-none">
                <Image src="/assets/cohorts.png" alt="Batch illustration" width={500} height={500} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Batch Showcase */}
      <div className="bg-skin">
        <div className="container max-w-[90%] lg:max-w-6xl mx-auto py-16 lg:py-20 lg:px-12">
          <h2 className="text-2xl lg:text-5xl text-center mb-8">Explore Our Batches</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(batchNumber => (
              <div key={batchNumber} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-2xl mb-2">
                    Batch {batchNumber} {["🚀", "💡", "🔧", "🌟", "🔬", "🛠️", "🧪", "🎨", "🔮"][batchNumber - 1]}
                  </h3>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Featured Builders:</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {batchBuilders[batchNumber].map((builder, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Address address={builder} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-auto">
                    <TrackedLink
                      id={`Batch-${batchNumber}`}
                      href={`https://batch${batchNumber}.buidlguidl.com/`}
                      className="btn btn-primary btn-outline"
                    >
                      Explore Batch {batchNumber}
                    </TrackedLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Batches;
