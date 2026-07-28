import { BlogMeta } from "~~/services/blog";

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
  image: `${SITE_URL}/api/og?title=${encodeURIComponent(meta.title)}`,
  datePublished: meta.date,
  url: `${SITE_URL}${meta.url}`,
  publisher: {
    "@type": "Organization",
    name: "BuidlGuidl",
    url: SITE_URL,
  },
});
