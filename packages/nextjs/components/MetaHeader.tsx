import React from "react";
import Head from "next/head";

type MetaHeaderProps = {
  title?: string;
  description?: string;
  image?: string;
  twitterCard?: string;
  // Route path (e.g. "/blog/slug") used to build the self-referencing canonical.
  path?: string;
  children?: React.ReactNode;
};

const baseUrl = "https://buidlguidl.com/";

export const MetaHeader = ({
  title = "BuidlGuidl",
  description = "Products, tools, and education for the Ethereum ecosystem.",
  image = "thumbnail.png",
  twitterCard = "summary_large_image",
  path,
  children,
}: MetaHeaderProps) => {
  const imageUrl = baseUrl + image;
  const canonicalUrl = path ? new URL(path, baseUrl).href : undefined;

  return (
    <Head>
      {title && (
        <>
          <title>{title}</title>
          <meta property="og:title" content={title} />
          <meta name="twitter:title" content={title} />
        </>
      )}
      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}
      {image && (
        <>
          <meta property="og:image" content={imageUrl} />
          <meta name="twitter:image" content={imageUrl} />
        </>
      )}
      {twitterCard && <meta name="twitter:card" content={twitterCard} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
      {children}
    </Head>
  );
};
