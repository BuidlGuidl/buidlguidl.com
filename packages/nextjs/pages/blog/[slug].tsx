import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { ArticleLayout } from "~~/components/ArticleLayout";
import { JsonLd } from "~~/components/JsonLd";
import { BlogHeading, BlogMeta, getAllBlogSlugs, getBlogBySlug } from "~~/services/blog";
import { countWords, serializeMdx } from "~~/utils/mdx";
import { articleSchema } from "~~/utils/seo";

interface Props {
  source: MDXRemoteSerializeResult;
  meta: BlogMeta;
  headings: BlogHeading[];
  wordCount: number;
}

const BlogPost: NextPage<Props> = ({ source, meta, headings, wordCount }) => (
  <ArticleLayout meta={meta} source={source} headings={headings} wordCount={wordCount} showDate>
    <JsonLd data={articleSchema(meta)} />
  </ArticleLayout>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllBlogSlugs();
  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const { meta, content, headings } = getBlogBySlug(slug);
  const source = await serializeMdx(content);
  return { props: { source, meta, headings, wordCount: countWords(content) } };
};

export default BlogPost;
