import Link from "next/link";
import type { GetStaticProps, NextPage } from "next";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { MetaHeader } from "~~/components/MetaHeader";
import { GuideMeta, getAllGuides } from "~~/services/guides";

interface Props {
  guides: GuideMeta[];
}

const Guides: NextPage<Props> = ({ guides }) => {
  return (
    <>
      <MetaHeader
        title="Guides - BuidlGuidl"
        description="Practical guides for learning and building on Ethereum, from where to start to how to structure a full-stack dapp."
        path="/guides"
      />
      {/* Title band, hero-style fade behind the header */}
      <div className="hero-fade">
        <Header transparent />
        <div className="w-full max-w-[760px] mx-auto px-5 sm:px-6 pt-4 pb-10 sm:pt-8 sm:pb-14">
          <h1 className="text-3xl sm:text-5xl mb-3">Guides</h1>
          <p className="text-base-content/70 m-0">
            Practical guides for learning and building on Ethereum, from where to start to how to structure a full-stack
            dapp.
          </p>
        </div>
      </div>

      {/* Boxed guide list */}
      <div className="bg-skin">
        <div className="w-full max-w-[760px] mx-auto px-4 sm:px-6 py-8 sm:py-12 min-h-[50vh]">
          <div className="bg-white rounded-2xl shadow-md px-5 sm:px-10 py-4 sm:py-6 divide-y divide-base-content/10">
            {guides.map(guide => (
              <Link key={guide.slug} href={guide.url} className="block group py-8">
                <h2 className="text-xl sm:text-2xl my-0 group-hover:text-primary transition-colors">{guide.title}</h2>
                <p className="m-0 mt-2 text-base-content/60">{guide.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const guides = getAllGuides();
  return { props: { guides } };
};

export default Guides;
