import { BlogMeta } from "~~/services/blog";
import { GuideFaq, GuideMeta } from "~~/services/guides";

export const SITE_URL = "https://buidlguidl.com";

// Organization schema for the homepage.
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BuidlGuidl",
  url: SITE_URL,
  logo: `${SITE_URL}/thumbnail.png`,
  description: "Products, tools, and education for the Ethereum ecosystem.",
  sameAs: ["https://twitter.com/buidlguidl", "https://github.com/BuidlGuidl", "https://buidlguidl.substack.com"],
};

// Article schema for a single blog post.
export const articleSchema = (meta: BlogMeta) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: meta.title,
  description: meta.description,
  datePublished: meta.date,
  url: `${SITE_URL}${meta.url}`,
  publisher: {
    "@type": "Organization",
    name: "BuidlGuidl",
    url: SITE_URL,
  },
});

// Article schema for a single guide.
export const guideArticleSchema = (meta: GuideMeta) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: meta.title,
  description: meta.description,
  datePublished: meta.date,
  url: `${SITE_URL}${meta.url}`,
  publisher: {
    "@type": "Organization",
    name: "BuidlGuidl",
    url: SITE_URL,
  },
});

// Breadcrumb schema: Home > Guides > this guide.
export const guideBreadcrumbSchema = (meta: GuideMeta) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: meta.title, item: `${SITE_URL}${meta.url}` },
  ],
});

// FAQPage schema built from a guide's faqs frontmatter.
export const guideFaqSchema = (faqs: GuideFaq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});
