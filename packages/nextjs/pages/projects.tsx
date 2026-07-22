import type { NextPage } from "next";
import { BuildCard } from "~~/components/BuildCard";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { MetaHeader } from "~~/components/MetaHeader";
import { BgClientSection } from "~~/components/projects/BgClientSection";
import { EthTourSection } from "~~/components/projects/EthTourSection";
import { ScaffoldEthSection } from "~~/components/projects/ScaffoldEthSection";
import { PROJECTS, Project } from "~~/utils/projects";

const CARD_PROJECTS = PROJECTS.filter(project => !project.spotlight);

const CardRow = ({ projects, className }: { projects: Project[]; className: string }) => (
  <div className={className}>
    <div className="container max-w-[90%] lg:max-w-6xl mx-auto py-16 lg:py-24 lg:px-12 flex gap-8 flex-wrap justify-center">
      {projects.map(project => (
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
  </div>
);

const Projects: NextPage = () => {
  return (
    <>
      <MetaHeader
        title="Projects - BuidlGuidl"
        description="Open source tools, apps and education programs we build and maintain for the Ethereum ecosystem."
      />
      <div className="hero-fade">
        <Header transparent />
        <div className="container max-w-[90%] lg:max-w-6xl mx-auto px-5 sm:px-6 lg:px-12 pt-4 pb-10 sm:pt-8 sm:pb-14">
          <h1 className="text-3xl sm:text-5xl mb-3">Projects</h1>
          <p className="text-base-content/70 m-0">
            Open source tools, apps and education programs we build and maintain for the Ethereum ecosystem.
          </p>
        </div>
      </div>
      <ScaffoldEthSection prevBg="bg-[#EFFBCA]" />
      <CardRow projects={CARD_PROJECTS.slice(0, 3)} className="bg-base-300" />
      <BgClientSection />
      <CardRow projects={CARD_PROJECTS.slice(3)} className="bg-base-100" />
      <EthTourSection />
      <Footer />
    </>
  );
};

export default Projects;
