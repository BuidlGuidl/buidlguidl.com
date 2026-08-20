// Hand-curated index of every cohort stream BuidlGuidl ran.
//
// The two upstream sources disagree on names ("Play full" vs "Play Full", "NiftyInk" vs
// "Nifty Ink"), and several cohorts redeployed their contract mid-life, so neither source can
// be trusted to name or de-duplicate a cohort on its own. This file is the tiebreaker.
//
// `slug` is a URL and a redirect target: `mercs.buidlguidl.com` 301s to `/grants/cohorts/mercs`.
// Never derive it from `displayName` — a copy edit must not be able to break a redirect.
//
// Snapshot-time input only. These fields are baked into `data/grants/cohorts.json`, which is
// what the pages read, so this file never ships to the browser.

/**
 * @typedef {Object} CohortRegistryEntry
 * @property {string} address canonical contract, lowercase
 * @property {string} slug URL segment and 301 target
 * @property {string} displayName wins over both upstream sources
 * @property {1 | 10} chainId
 * @property {string} [subdomain] former subdomain, without the buidlguidl.com suffix
 * @property {string} [blurb]
 * @property {string[]} [legacyAddresses] superseded contracts rolled up into this cohort
 */

/** @type {CohortRegistryEntry[]} */
export const COHORT_REGISTRY = [
  {
    address: "0x1c873c172662c3774d089ab967911bc32c04bb08",
    slug: "mercs",
    displayName: "Mercs",
    chainId: 1,
    subdomain: "mercs",
    blurb: "BuidlGuidl's dev team responsible for shipping and improving core projects.",
    legacyAddresses: ["0x8d84f7e545f69746e4a1cad0f7ac9a83ccdf2c65"],
  },
  {
    address: "0x2634af3e799d3e17c6cf30bcf1275a7e3808f0df",
    slug: "ens",
    displayName: "ENS",
    chainId: 1,
    subdomain: "ens",
    blurb: "Builders working on ENS tooling and integrations.",
  },
  {
    address: "0x2be18e07c7be0a2cc408c9e02c90203b2052d7de",
    slug: "jessys-hacker-house",
    displayName: "Jessy's Hacker House",
    chainId: 1,
    blurb:
      "Jessy's flagship cohort giving up-and-coming devs the support to stay free agents and build whatever calls to them.",
  },
  {
    address: "0x3ddb71fb2b6fb530615fc1deb9461d6489eda1ff",
    slug: "0xafro",
    displayName: "0xAfro",
    chainId: 10,
  },
  {
    address: "0x3e920e4a1c26a9c6488c3e5c7cb1e91a179927f5",
    slug: "play-full",
    displayName: "Play Full",
    chainId: 10,
    subdomain: "play-full",
    blurb: "Exploring onchain games and other playful experiences.",
  },
  {
    address: "0x4b195bb4dd0a8fd739433c6854ca15decbba52e8",
    slug: "nodes",
    displayName: "Nodes",
    chainId: 1,
    subdomain: "nodes",
    blurb: "Developing tools for running Ethereum nodes and a free distributed RPC.",
    legacyAddresses: ["0x24f0aec2e06c25c60f54e37870ca555b2d9ba609", "0x77a01ea7050b71067e6eb78cd78aad34a39a3899"],
  },
  {
    address: "0x502730421b796baeeb9d907d88685234ddb44750",
    slug: "infrastructure",
    displayName: "Infrastructure (Jessy)",
    chainId: 1,
    blurb: "Developing infrastructure for DeFi protocol integrations.",
  },
  {
    address: "0x55cb9cb337cdb0a41cac89ffac4627744b50b566",
    slug: "shipyard",
    displayName: "Ship Yard",
    chainId: 10,
    subdomain: "shipyard",
    blurb: "Shipping operational tools and new Speedrun Ethereum challenges.",
  },
  {
    address: "0x5c2584671d4a43c67b92d8a053b16546a1162b3b",
    slug: "batches",
    displayName: "Batches",
    chainId: 1,
    subdomain: "batches",
    blurb: "Providing one-on-one support for members of the BuidlGuidl Batches program.",
    legacyAddresses: ["0xe98994c7e30a7f0a108ff3bf20773cd521494a5a"],
  },
  {
    address: "0x751e87af85b97054b30ad822291696482625e947",
    slug: "launchpod",
    displayName: "LaunchPod",
    chainId: 10,
    subdomain: "launchpod",
  },
  {
    address: "0x825078ab3d66b91b66d4b907a4742019ca4fdf30",
    slug: "workshops",
    displayName: "Workshops",
    chainId: 1,
    subdomain: "workshops",
    blurb: "Running live workshops and coding sessions to support the builder community.",
    legacyAddresses: ["0x1497f3831918e5220573ca6cdee15f16b2dbb063"],
  },
  {
    address: "0x882d6ab20ce8af9cb32e6ee3dc85f090427bcd1a",
    slug: "niftyink",
    displayName: "Nifty Ink",
    chainId: 1,
    subdomain: "niftyink",
    blurb: "Building an onchain multiplayer game that explores AI-human interaction.",
  },
  {
    address: "0x964d0c9a421953f95daf3a5c5406093a3014a5d8",
    slug: "sandgarden",
    displayName: "Sand Garden",
    chainId: 10,
    subdomain: "sandgarden",
    blurb: "An open sandbox cohort for builders experimenting with new ideas.",
    legacyAddresses: ["0x2ea63c9c9c114ae85b1027697a906420a23e8572"],
  },
  {
    address: "0xa6efa453c25658f725590a5821cf408818f25fef",
    slug: "media",
    displayName: "BG Media",
    chainId: 1,
    subdomain: "media",
    blurb: "Creating videos, blogs, and other media devoted to building on Ethereum.",
  },
  {
    address: "0xa90f607224a0236b08ae02178ab57aef712f86d3",
    slug: "sanctum",
    displayName: "Sanctum",
    chainId: 1,
    subdomain: "sanctum",
    blurb: "Building tools to support BuidlGuidl operations and outreach.",
  },
  {
    address: "0xacc9cc4983d57cea0748b8cd1adb87ada5b1a67c",
    slug: "not-just-notfellows",
    displayName: "Not Just Notfellows",
    chainId: 1,
  },
  {
    address: "0xaf18f0f1f096fac34e816c7409348d313ef7c84f",
    slug: "security-optimizooors",
    displayName: "Security & Optimizooors (Jessy)",
    chainId: 1,
    blurb: "Worked on a Uniswap hooks contract and ran bounty programs for discovering smart contract vulnerabilities.",
  },
  {
    address: "0xcb59f4bab420abdb3c6ae0997cc9ac7526d5e163",
    slug: "autonomous-worlds",
    displayName: "Autonomous Worlds (Jessy)",
    chainId: 1,
    subdomain: "autoworld-streams",
    blurb: "Builders launching onchain autonomous world gaming experiences.",
  },
  {
    address: "0xd0ace9462d957485904b3437d4818ee2f9f2efed",
    slug: "owners",
    displayName: "Owners",
    chainId: 1,
    subdomain: "owners",
    blurb: "Team members keeping BuidlGuidl's operations running smoothly.",
  },
  {
    address: "0xe54f8b7fddf75257c7f248a197553ac467296053",
    slug: "outreach",
    displayName: "BG Outreach",
    chainId: 1,
    subdomain: "outreach",
    blurb: "Conducting outreach activities, both virtually and at community events.",
  },
  {
    address: "0xf32409271be1bb02f15922a6ea38be79e664a247",
    slug: "balancer",
    displayName: "Balancer",
    chainId: 1,
    subdomain: "balancer",
    blurb: "Developed a Scaffold-ETH 2 balancer pool lookup and swap app.",
  },
  {
    address: "0xfe2d6743d7180e07be769bf59d3c0f560b199434",
    slug: "zk-cryptography",
    displayName: "ZK & Cryptography (Jessy)",
    chainId: 1,
    blurb: "Exploring the applications of ZK and cryptography.",
  },
];

/**
 * Resolve a contract address to its cohort, following legacy addresses to their parent.
 * @param {string} address
 * @returns {CohortRegistryEntry | undefined}
 */
export const findCohortEntry = address => {
  const needle = address.toLowerCase();
  return COHORT_REGISTRY.find(
    entry => entry.address === needle || entry.legacyAddresses?.some(legacy => legacy === needle),
  );
};
