// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  async redirects() {
    return [
      {
        source: "/builders",
        destination: "https://app.buidlguidl.com/builders",
        permanent: true,
      },
      {
        source: "/builders/:address",
        destination: "https://app.buidlguidl.com/builders/:address",
        permanent: true,
      },
      {
        source: "/build/:buildId",
        destination: "https://app.buidlguidl.com/build/:buildId",
        permanent: true,
      },
      {
        source: "/builds",
        destination: "https://app.buidlguidl.com/builds",
        permanent: true,
      },
      {
        source: "/activity",
        destination: "https://app.buidlguidl.com/activity",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
