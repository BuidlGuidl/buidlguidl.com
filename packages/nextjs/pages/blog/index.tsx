import Link from "next/link";
import type { GetStaticProps, NextPage } from "next";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { MetaHeader } from "~~/components/MetaHeader";
import { BlogMeta, getAllBlogs } from "~~/services/blog";
import { formatBlogDate } from "~~/utils/blog";

interface Props {
  posts: BlogMeta[];
}

const Blog: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <MetaHeader
        title="Blog - BuidlGuidl"
        description="Writing from the BuidlGuidl team: tooling, education and research for the Ethereum ecosystem."
        path="/blog"
      />
      {/* Title band, hero-style fade behind the header */}
      <div className="hero-fade">
        <Header transparent />
        <div className="w-full max-w-[760px] mx-auto px-5 sm:px-6 pt-4 pb-10 sm:pt-8 sm:pb-14">
          <h1 className="text-3xl sm:text-5xl mb-3">Blog</h1>
          <p className="text-base-content/70 m-0">
            Writing from the BuidlGuidl team: tooling, education and research for the Ethereum ecosystem.
          </p>
        </div>
      </div>

      {/* Boxed post list */}
      <div className="bg-skin">
        <div className="w-full max-w-[760px] mx-auto px-4 sm:px-6 py-8 sm:py-12 min-h-[50vh]">
          <div className="bg-white rounded-2xl shadow-md px-5 sm:px-10 py-4 sm:py-6 divide-y divide-base-content/10">
            {posts.map(post => (
              <Link key={post.slug} href={post.url} className="block group py-8">
                <span className="block font-mono text-sm text-base-content/50 mb-2">{formatBlogDate(post.date)}</span>
                <h2 className="text-xl sm:text-2xl my-0 group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="m-0 mt-2 text-base-content/60">{post.description}</p>
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
  const posts = getAllBlogs();
  return { props: { posts } };
};

export default Blog;
