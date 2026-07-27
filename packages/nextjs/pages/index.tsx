import Image from "next/image";
import Link from "next/link";
import type { GetStaticProps, NextPage } from "next";
import { BuildCard } from "~~/components/BuildCard";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { JsonLd } from "~~/components/JsonLd";
import { MetaHeader } from "~~/components/MetaHeader";
import { BlogMeta, getAllBlogs } from "~~/services/blog";
import { formatBlogDate } from "~~/utils/blog";
import { PROJECTS } from "~~/utils/projects";
import { organizationSchema } from "~~/utils/seo";

const HOW_WE_WORK = [
  {
    title: "We prototype fast",
    description: "We get a working prototype in your hands early, then iterate together until it's right.",
  },
  {
    title: "We're AI-native",
    description:
      "We use AI heavily across our whole workflow, and dive deeper than off-the-shelf tools: building our own harnesses, agents, and AI-powered products.",
  },
  {
    title: "We're ecosystem veterans",
    description:
      "We've been building in the Ethereum ecosystem for 8+ years, working alongside the Ethereum Foundation, client teams, and protocol devs.",
  },
  {
    title: "We care about the work",
    description: "We only take on work we believe in, and we give it the same care we put into our own products.",
  },
];

const FEATURED_PROJECTS = PROJECTS.filter(project => project.featured);
const OTHER_PROJECTS = PROJECTS.filter(project => !project.featured);

// Alphabetical by first name.
const TEAM: { name: string; role?: string; src: string; github: string; x?: string }[] = [
  {
    name: "Austin Griffith",
    role: "Founder",
    src: "/assets/team/austin.jpg",
    github: "austintgriffith",
    x: "austingriffith",
  },
  { name: "Carlos Sánchez", role: "CTO", src: "/assets/team/carlos.jpg", github: "carletex", x: "_carletex_" },
  {
    name: "Damian Martinelli",
    role: "Blockchain Engineer",
    src: "/assets/team/damian.jpg",
    github: "damianmarti",
    x: "damianmarti",
  },
  { name: "Pablo Alayeto", role: "Product", src: "/assets/team/pablo.jpg", github: "Pabl0cks", x: "pabl0cks" },
  { name: "Rinat", role: "Full-stack Engineer", src: "/assets/team/rinat.jpg", github: "rin-st" },
  {
    name: "Shiv Bhonde",
    role: "Full-stack Engineer",
    src: "/assets/team/shiv.jpg",
    github: "technophile-04",
    x: "ShivBhonde",
  },
  { name: "Spencer Faber", role: "Infra & Content", src: "/assets/team/spencer.jpg", github: "sfaber34" },
  { name: "Zak Griffith", role: "Operations", src: "/assets/team/zak.jpg", github: "ZakGriffith", x: "ZakAgain" },
];

interface Props {
  posts: BlogMeta[];
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <MetaHeader title="BuidlGuidl: Learn and Build on Ethereum" path="/">
        <JsonLd data={organizationSchema} />
      </MetaHeader>
      {/* Hero section with header */}
      <div className="relative min-h-[75vh] md:h-[75vh] md:min-h-[600px] flex flex-col">
        <div className="absolute h-1/4 w-full top-0 left-0 hero-top-gradient pointer-events-none"></div>
        <Header transparent />
        <div className="bg-[url(/assets/hero-new.png)] bg-[#EFFBCA] bg-cover bg-center flex-grow mt-[-50px]">
          <div className="flex flex-col justify-center items-center md:items-start md:justify-left mx-6 h-full md:ml-14 py-12 md:py-0 md:mt-[-30px]">
            <h1 className="text-center md:text-left z-10 text-3xl sm:text-4xl xl:text-5xl">
              Products, tools, and education <br className="hidden md:inline" /> for the Ethereum ecosystem
            </h1>
            <p className="text-center md:text-left z-10 text-base xl:text-xl max-w-md xl:max-w-xl mt-0 mb-2 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-3 md:bg-transparent md:backdrop-blur-none md:px-0 md:py-0">
              BuidlGuidl is a long-term technical partner to the Ethereum Foundation and teams across the ecosystem. We
              scope, build, and maintain production dapps, open-source tooling, and education programs.
            </p>
            <a href="#build-with-us" className="btn btn-secondary btn-md px-8 hover:opacity-100 w-fit mt-4 z-10">
              Build with us
            </a>
          </div>
        </div>
        <div className="absolute h-1/4 w-full bottom-0 left-0 hero-bottom-gradient flex items-end justify-center pointer-events-none"></div>
      </div>

      {/* Trusted by */}
      <div className="bg-white">
        <div className="container max-w-[90%] lg:max-w-7xl m-auto py-6 lg:py-7 flex flex-col items-center gap-3">
          <p className="m-0 text-xs">TRUSTED BY</p>
          <div className="flex flex-wrap gap-x-10 gap-y-4 lg:gap-x-14 items-center justify-center">
            <Image
              src="/assets/ef-logo.png"
              alt="Ethereum Foundation logo"
              width={200}
              height={200}
              className="h-14 w-auto"
            />
            <Image src="/assets/op-logo.svg" alt="Optimism logo" width={48} height={48} className="h-10 w-auto" />
            <Image src="/assets/ens-logo-dao.png" alt="ENS logo" width={96} height={64} className="h-10 w-auto" />
            <Image
              src="/assets/arbitrum-foundation-logo.svg"
              alt="Arbitrum Foundation logo"
              width={170}
              height={44}
              className="h-9 w-auto"
            />
          </div>
        </div>
      </div>

      {/* Quote section*/}
      <div className="bg-base-100">
        <div className="container max-w-[90%] lg:max-w-7xl m-auto py-16 lg:py-20 lg:pl-20 flex flex-col-reverse lg:flex-row items-center lg:items-start lg:gap-10">
          {/* Quote image */}
          <div className="flex flex-col items-center max-w-md lg:max-w-md lg:mt-6">
            <Image
              src="/assets/atg.jpg"
              alt="austin griffith"
              width={120}
              height={120}
              className="rounded-[150px] shadow-xl"
            />
          </div>
          {/* Quote Text */}
          <div className="md:max-w-[80%] lg:max-w-[70%] flex flex-col items-center lg:items-start">
            <p className="font-thin text-xl lg:text-2xl text-center lg:text-left mb-10 lg:mb-4">
              “BuidlGuidl is educating Ethereum builders, creating state-of-the-art tools, and shipping products
              onchain!”
            </p>
            <p className="m-0 text-xl font-medium">Austin Griffith</p>
            <p className="m-0 mb-4 text-md font-thin">BuidlGuidl Founder</p>
          </div>
        </div>
      </div>

      {/* How we work */}
      <div className="bg-white">
        <div className="container flex flex-col items-center max-w-[90%] lg:max-w-6xl mx-auto pt-10 pb-16 lg:pt-12 lg:pb-24 lg:px-12">
          <Image src="/assets/diamond.svg" alt="" width={48} height={48} className="w-10 lg:w-12 mb-12 lg:mb-16" />
          <div className="grid sm:grid-cols-2 gap-x-16 gap-y-10">
            {HOW_WE_WORK.map(item => (
              <div key={item.title}>
                <h3 className="text-lg lg:text-xl font-semibold mt-0 mb-2">{item.title}</h3>
                <p className="m-0">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest from the blog */}
      <div className="bg-base-100">
        <div className="container max-w-[90%] lg:max-w-6xl mx-auto py-10 lg:py-12 lg:px-12 flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-16">
          <div className="shrink-0">
            <h2 className="text-2xl lg:text-3xl my-0">From the blog</h2>
            <Link href="/blog" className="text-sm underline underline-offset-4">
              View all posts →
            </Link>
          </div>
          <div className="flex-1 divide-y divide-base-content/10">
            {posts.slice(0, 5).map(post => (
              <Link
                key={post.slug}
                href={post.url}
                className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-6 gap-y-1 py-3 first:pt-0 last:pb-0"
              >
                <span className="font-medium group-hover:underline underline-offset-4">{post.title}</span>
                <span className="text-sm text-base-content/60 shrink-0">{formatBlogDate(post.date)}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured projects */}
      <div className="bg-base-300" id="projects">
        <div className="container flex flex-col items-center justify-center max-w-[90%] lg:max-w-6xl mx-auto py-16 lg:py-24 lg:px-12 gap-6">
          <h2 className="text-3xl lg:text-5xl font-semibold my-0 text-center">Featured projects</h2>
          <Image
            src="/assets/ranking-featured-icon.svg"
            alt="rankings icon"
            width={40}
            height={40}
            className="w-8 lg:w-10"
          />
          <div className="flex gap-8 flex-wrap justify-center mt-2 lg:mt-4">
            {FEATURED_PROJECTS.map(project => (
              <BuildCard
                key={project.name}
                name={project.name}
                description={project.description}
                src={project.src}
                link={project.link}
                metrics={project.metrics}
                imageFit={project.imageFit}
                imageBg={project.imageBg}
              />
            ))}
          </div>
          <p className="text-center m-0 max-w-2xl">
            Plus{" "}
            {OTHER_PROJECTS.map((project, index) => (
              <span key={project.name}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 whitespace-nowrap"
                >
                  {project.name}
                </a>
                {index < OTHER_PROJECTS.length - 2 ? ", " : index === OTHER_PROJECTS.length - 2 ? " and " : "."}
              </span>
            ))}
          </p>
          <Link href="/projects" className="btn btn-secondary btn-md px-8 hover:opacity-100">
            View all projects
          </Link>
        </div>
      </div>

      {/* Team */}
      <div className="bg-[#FFD2B3]" id="team">
        <div className="-mt-12 bg-repeat-x h-20 bg-[35%_top] bg-base-300"></div>
        <div className="-mt-12 bg-[url(/assets/sre-path.png)] bg-repeat-x h-20 bg-[35%_top]"></div>
        <div className="container flex flex-col items-center max-w-[90%] lg:max-w-5xl mx-auto pt-6 pb-16 lg:pt-10 lg:pb-24 gap-10">
          <div className="flex flex-col items-center gap-4">
            <Image src="/assets/builders.svg" alt="builders icon" width={40} height={36} className="w-8 lg:w-10" />
            <h2 className="text-3xl lg:text-5xl font-semibold my-0 text-center">The Team</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 w-full">
            {TEAM.map(member => (
              <div key={member.name} className="flex flex-col items-center gap-3">
                <Image
                  src={member.src}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="text-center">
                  <p className="m-0 font-semibold leading-tight whitespace-nowrap">{member.name}</p>
                  {member.role && <p className="m-0 text-sm">{member.role}</p>}
                </div>
                <div className="flex gap-3">
                  <a
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on GitHub`}
                    className="opacity-60 hover:opacity-100"
                  >
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                    </svg>
                  </a>
                  {member.x && (
                    <a
                      href={`https://x.com/${member.x}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} on X`}
                      className="opacity-60 hover:opacity-100"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Build with us */}
      <div className="bg-skin" id="build-with-us">
        <div className="container flex flex-col items-center justify-center max-w-[90%] lg:max-w-3xl mx-auto py-16 lg:py-24 gap-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl lg:text-4xl m-0">Build with us</h2>
            <Image src="/assets/builds-uploaded.svg" alt="builds icon" width={23} height={30} className="w-5 lg:w-6" />
          </div>
          <p className="text-lg m-0">
            We work with L2s, DAOs and companies that need developer tooling, apps, or education built. Tell us what you
            need.
          </p>
          <a href="mailto:admin@buidlguidl.com" className="btn btn-primary btn-md px-8 mt-2 hover:opacity-100">
            Get in touch
          </a>
        </div>
      </div>

      {/* Image above footer */}
      <div className="bg-skin relative -mb-[20px]">
        <div className="object-cover w-full">
          <Image src="/assets/bg-batches-footer.png" alt="Footer image" width={2500} height={1000} />
        </div>
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = getAllBlogs();
  return { props: { posts } };
};

export default Home;
