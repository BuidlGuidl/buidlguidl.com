/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://buidlguidl.com",
  // robots.txt is hand-authored in public/, so do not let next-sitemap overwrite it.
  generateRobotsTxt: false,
  // Routes that next.config.js redirects off-site, so they must not appear in the sitemap.
  exclude: ["/builders", "/builders/*", "/builds", "/build/*", "/activity", "/grants/cohorts/*"],
};
