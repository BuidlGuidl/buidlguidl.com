import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContentHeading, ProgressBar, TableOfContents, estimateReadTime, mdxComponents } from "~~/components/mdx";
import { formatBlogDate } from "~~/utils/blog";

export interface ArticleMeta {
  title: string;
  description: string;
  url: string;
  date: string;
}

interface ArticleLayoutProps {
  meta: ArticleMeta;
  source: MDXRemoteSerializeResult;
  headings: ContentHeading[];
  wordCount: number;
  // Show the publish date in the header (blog posts) or hide it (evergreen guides).
  showDate?: boolean;
  // JSON-LD schema blocks, rendered into the head via MetaHeader.
  children?: React.ReactNode;
}

// Shared reading layout for long-form MDX content (blog posts and guides).
export const ArticleLayout = ({
  meta,
  source,
  headings,
  wordCount,
  showDate = false,
  children,
}: ArticleLayoutProps) => {
  return (
    <>
      <MetaHeader
        title={`${meta.title} - BuidlGuidl`}
        description={meta.description}
        image={`api/og?title=${encodeURIComponent(meta.title)}`}
        path={meta.url}
      >
        {children}
      </MetaHeader>

      <ProgressBar />

      {/* Title band, hero-style fade behind the header */}
      <div className="hero-fade">
        <Header transparent />
        <header className="w-full max-w-[760px] mx-auto px-5 sm:px-6 pt-4 pb-10 sm:pt-8 sm:pb-14">
          <h1 className="text-3xl sm:text-[2.5rem] sm:leading-[1.15] mb-4">{meta.title}</h1>
          <p className="text-base sm:text-lg text-base-content/70 leading-relaxed m-0">{meta.description}</p>
          <div className="flex items-center gap-3 mt-5 font-mono text-sm text-base-content/60">
            {showDate && (
              <>
                <span>{formatBlogDate(meta.date)}</span>
                <span className="text-base-content/30">|</span>
              </>
            )}
            <span>{estimateReadTime(wordCount)}</span>
          </div>
        </header>
      </div>

      {/* Body: TOC sidebar + boxed article */}
      <div className="bg-skin">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col xl:flex-row xl:justify-center items-stretch xl:items-start gap-8">
          <TableOfContents headings={headings} />
          <article className="bg-white rounded-2xl shadow-md w-full max-w-[760px] mx-auto xl:mx-0 px-5 sm:px-10 py-6">
            <div className="sm:text-[16.5px] leading-[1.6]">
              <MDXRemote {...source} components={mdxComponents} />
            </div>
          </article>
          {/* Spacer to keep the article centered next to the TOC */}
          <div className="hidden xl:block w-52 shrink-0" />
        </div>
      </div>

      <Footer />
    </>
  );
};
