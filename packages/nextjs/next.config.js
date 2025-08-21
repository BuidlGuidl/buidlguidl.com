// @ts-check
// @ts-ignore
const { withPlausibleProxy } = require("next-plausible");

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
        destination: "https://speedrunethereum.com/builders",
        permanent: true,
      },
      {
        source: "/builders/:address",
        destination: "https://speedrunethereum.com/builders:address",
        permanent: true,
      },
      {
        source: "/build/:buildId",
        destination: "https://speedrunethereum.com/build/:buildId",
        permanent: true,
      },
      {
        source: "/builds",
        destination: "https://speedrunethereum.com/builds",
        permanent: true,
      },
      {
        source: "/activity",
        destination: "https://speedrunethereum.com/admin/activity",
        permanent: true,
      },
    ];
  },
};

module.exports = withPlausibleProxy()(nextConfig);
