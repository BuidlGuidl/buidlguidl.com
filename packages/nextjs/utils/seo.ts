import { BlogMeta } from "~~/services/blog";
import { CohortSummary } from "~~/utils/grants/types";

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

// Collection schema for the public grants archive overview. Cohort detail pages are
// intentionally omitted because they are archival pages marked noindex.
export const grantsArchiveSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Grants given by BuidlGuidl",
  description: "Every grant, cohort, and builder stream BuidlGuidl funded, with the builders' own work logs.",
  url: `${SITE_URL}/grants`,
  isPartOf: {
    "@type": "Organization",
    name: "BuidlGuidl",
    url: SITE_URL,
  },
};

// Collection schema for a single cohort, with a breadcrumb back to the archive.
export const cohortSchema = (cohort: CohortSummary) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `${cohort.name} cohort`,
  description: `${cohort.builderCount} builders streamed ${cohort.totalWithdrawn} ETH from the ${cohort.name} cohort across ${cohort.withdrawalCount} withdrawals.`,
  url: `${SITE_URL}/grants/cohorts/${cohort.slug}`,
  isPartOf: {
    "@type": "CollectionPage",
    name: "Grants given by BuidlGuidl",
    url: `${SITE_URL}/grants`,
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "BuidlGuidl", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Grants archive", item: `${SITE_URL}/grants` },
      { "@type": "ListItem", position: 3, name: cohort.name, item: `${SITE_URL}/grants/cohorts/${cohort.slug}` },
    ],
  },
});

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
