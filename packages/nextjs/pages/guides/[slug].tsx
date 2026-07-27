import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { ArticleLayout } from "~~/components/ArticleLayout";
import { JsonLd } from "~~/components/JsonLd";
import { GuideHeading, GuideMeta, getAllGuideSlugs, getGuideBySlug } from "~~/services/guides";
import { countWords, serializeMdx } from "~~/utils/mdx";
import { guideArticleSchema, guideBreadcrumbSchema, guideFaqSchema } from "~~/utils/seo";

interface Props {
  source: MDXRemoteSerializeResult;
  meta: GuideMeta;
  headings: GuideHeading[];
  wordCount: number;
}

// Guides are evergreen, so the publish date is intentionally not shown (showDate omitted).
const GuidePost: NextPage<Props> = ({ source, meta, headings, wordCount }) => (
  <ArticleLayout meta={meta} source={source} headings={headings} wordCount={wordCount}>
    <JsonLd data={guideArticleSchema(meta)} />
    <JsonLd data={guideBreadcrumbSchema(meta)} />
    {meta.faqs && meta.faqs.length > 0 && <JsonLd data={guideFaqSchema(meta.faqs)} />}
  </ArticleLayout>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllGuideSlugs();
  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const { meta, content, headings } = getGuideBySlug(slug);
  const source = await serializeMdx(content);
  return { props: { source, meta, headings, wordCount: countWords(content) } };
};

export default GuidePost;
