import { ReactNode } from "react";
import { RecapStat } from "./RecapSection";
import { TaskList } from "./TaskList";
import { TerminalTab } from "./TerminalWindow";

export interface RecapSectionData {
  id: string;
  track: string;
  title: string;
  // Shorter label for the side navigation; falls back to title
  navTitle?: string;
  intro: ReactNode;
  stats?: RecapStat[];
  tabs: TerminalTab[];
}

// Link styled for the dark terminal content
const DarkLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-primary underline hover:text-white transition-colors"
  >
    {children}
  </a>
);

const TerminalLabel = ({ children }: { children: ReactNode }) => (
  <p className="font-mono text-xs text-white uppercase tracking-widest mt-6 mb-3">{children}</p>
);

// Inline "number + label" stats row inside the terminal
const InlineStats = ({ stats }: { stats: { value: string; label: string }[] }) => (
  <div className="flex items-center gap-4 flex-wrap mb-6">
    {stats.map((stat, index) => (
      <div key={stat.label} className="flex items-center gap-4">
        {index > 0 && <span className="text-white/20">│</span>}
        <div className="flex items-center gap-2">
          <span className={`text-xl font-bold ${index % 2 === 0 ? "text-secondary" : "text-primary"}`}>
            {stat.value}
          </span>
          <span className="text-white/50 text-xs">{stat.label}</span>
        </div>
      </div>
    ))}
  </div>
);

// Small bordered card for projects / prototypes inside the terminal
const ProjectCard = ({
  title,
  description,
  linkUrl,
  linkLabel,
}: {
  title: string;
  description: string;
  linkUrl?: string;
  linkLabel?: string;
}) => (
  <div className="p-4 border border-white/10 rounded-lg">
    <div className="flex items-start justify-between gap-4">
      <div>
        <span className="text-white text-sm font-medium">{title}</span>
        <p className="text-white/70 text-xs mt-1 mb-0">{description}</p>
      </div>
      {linkUrl ? (
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary hover:text-white text-xs whitespace-nowrap transition-colors"
        >
          {linkLabel || "View"} →
        </a>
      ) : (
        <span className="text-secondary text-xs whitespace-nowrap">WIP</span>
      )}
    </div>
  </div>
);

const SPEEDRUN: RecapSectionData = {
  id: "speedrun",
  track: "Education / Dev Onboarding Track",
  title: "Speedrun Ethereum",
  intro: (
    <>
      Our flagship educational product. In 2025, we doubled down by shipping targeted UX, SEO, and gamification
      improvements: increasing reach, signups, and challenge submissions.
    </>
  ),
  stats: [
    { value: "92.4k", label: "Unique Visitors", growth: "+74% from 2024" },
    { value: "5,700", label: "Unique Signups", growth: "+114% from 2024" },
    { value: "5,900", label: "Challenge Submissions", growth: "+40% from 2024" },
  ],
  tabs: [
    {
      id: "tasks",
      title: "Tasks & Achievements",
      content: (
        <TaskList
          tasks={[
            "Add a builder portfolio page and side quests",
            "Migrate builds from BuidlGuidl v3 and categorize them",
            "Create 23 Solidity guides and additional landing pages, driving a 100% increase in organic traffic",
            "Support the launch of five new challenges (Thanks Elliott and Philip!)",
            "Launch Google Ads campaigns and collaborate with Blockscout on referral traffic",
            "Improve conversion tracking and traffic source attribution",
            "Automate feedback collection from past Speedrunners to measure career impact and improve the platform",
            "Upgrade SRE to Scaffold-ETH 2",
            "Migrate challenges to extensions for easier maintenance with future Scaffold-ETH 2 upgrades",
          ]}
        />
      ),
      links: [
        { url: "https://speedrunethereum.com/", label: "Website" },
        { url: "https://github.com/BuidlGuidl/SpeedRunEthereum-v2", label: "Github" },
      ],
    },
  ],
};

const SCAFFOLD_ETH: RecapSectionData = {
  id: "scaffold-eth",
  track: "Dev Tooling Track",
  title: "Scaffold-ETH 2 Ecosystem",
  navTitle: "Scaffold-ETH 2",
  intro: (
    <>
      Our modular toolkit for bootstrapping full-stack Ethereum apps. In 2025, we simplified the core, extracted
      reusable packages, expanded extensions to better support onboarding and ecosystem integrations, and made it
      AI-ready.
    </>
  ),
  stats: [
    { value: "2,243+", label: "created in 2025", growth: "public repositories" },
    { value: "78k", label: "during 2025", growth: "npm downloads" },
  ],
  tabs: [
    {
      id: "toolkit",
      title: "Toolkit",
      content: (
        <>
          <p className="text-white/70 text-sm leading-relaxed mt-0 mb-6">
            The core open-source toolkit for rapidly prototyping and building decentralized applications on Ethereum.
          </p>
          <TaskList
            tasks={[
              "Enable Scaffold-ETH 2 deployments to IPFS",
              "Scaffold-ETH 2 it's showcased in the Mastering Ethereum v2 book",
              "Implement encrypted private key support",
              "Migrate to Tailwind v4 and DaisyUI v5",
              "Migrate to Next.js 15",
              "Improve documentation AI compatibility using llm-full.txt files",
              "Add custom Cursor rules to enhance DX and enable easier one-shot dApp generation",
              "Migrate documentation to the Vocs framework for improved styling, AI compatibility (ask ChatGPT), and dynamic unfurling",
            ]}
          />
        </>
      ),
      links: [{ url: "https://github.com/scaffold-eth/scaffold-eth-2", label: "Github" }],
    },
    {
      id: "create-eth",
      title: "create-eth CLI",
      content: (
        <>
          <p className="text-white/70 text-sm leading-relaxed mt-0 mb-6">
            CLI to bootstrap new Scaffold-ETH 2 projects with customizable extensions (starter kits)
          </p>
          <TaskList
            tasks={[
              "Improve documentation for extension creators, including an args file example",
              "Normalize template arguments and enable a more extensible system for extension developers",
              "Fix GitHub API rate limit errors",
              "Expose user-selected variables to extension developers via global variables",
              "Add core extensions, including Porto, x402, and EIP-5792",
            ]}
          />
        </>
      ),
      links: [{ url: "https://github.com/scaffold-eth/create-eth", label: "Github" }],
    },
    {
      id: "website",
      title: "Website",
      content: (
        <>
          <p className="text-white/70 text-sm leading-relaxed mt-0 mb-6">
            The <DarkLink href="https://scaffoldeth.io/">scaffoldeth.io</DarkLink> homepage, showcasing ecosystem
            projects and resources for builders.
          </p>
          <TaskList
            tasks={[
              <>
                Build Scaffold-ETH 2 usage tracker and send over 5000 repos using SE-2 to{" "}
                <DarkLink href="https://github.com/electric-capital/open-dev-data">
                  electric-capital/open-dev-data
                </DarkLink>
              </>,
              <>
                Ship <DarkLink href="https://projects.scaffoldeth.io/">projects.scaffoldeth.io</DarkLink> with SE-2
                usage stats, adding stats and direct link to SE-2 homepage
              </>,
              "Add 'Build an app on Ethereum in 8 minutes' video to homepage",
            ]}
          />
        </>
      ),
      links: [{ url: "https://github.com/scaffold-eth/scaffoldeth.io", label: "Github" }],
    },
    {
      id: "scaffold-ui",
      title: "Scaffold-UI",
      content: (
        <>
          <p className="text-white/70 text-sm leading-relaxed mt-0 mb-6">
            Standalone packages of reusable React hooks and UI components extracted from Scaffold-ETH 2.
          </p>
          <TaskList
            tasks={[
              "Monorepo setup with docs + example setup + packages setup",
              "3 npm packages available (components, hooks, debug-contracts)",
            ]}
          />
        </>
      ),
      links: [{ url: "https://github.com/scaffold-eth/scaffold-ui", label: "Github" }],
    },
    {
      id: "burner-connector",
      title: "Burner Connector",
      content: (
        <>
          <p className="text-white/70 text-sm leading-relaxed mt-0 mb-6">
            Lightweight wagmi connector for ephemeral burner wallets, enabling instant onboarding without extensions.
          </p>
          <TaskList tasks={["Maintenance", "Add compatibility with EIP-5792"]} />
        </>
      ),
      links: [{ url: "https://www.npmjs.com/package/burner-connector", label: "NPM package" }],
    },
  ],
};

const EDUCATIONAL: RecapSectionData = {
  id: "educational",
  track: "Education / Dev Onboarding Track",
  title: "Educational Initiatives",
  intro: (
    <>
      We ran security challenges through our second edition of the Capture The Flag platform and contributed to key
      community events, including our Builder Bootcamp at Devconnect Buenos Aires and dev support in Bhutan.
    </>
  ),
  stats: [
    { value: "1,600+", label: "", growth: "Flags minted" },
    { value: "20+", label: "", growth: "Workshops" },
  ],
  tabs: [
    {
      id: "ctf",
      title: "Capture The Flag",
      content: (
        <>
          <p className="text-white/70 text-sm leading-relaxed mt-0 mb-6">
            Hands-on security learning platform that challenges developers to solve real-world Web3 vulnerabilities. In
            2025, we launched the CTF as a live, always-on platform and expanded it with a second season.
          </p>
          <InlineStats
            stats={[
              { value: "4,400", label: "visitors" },
              { value: "1,645", label: "flags minted" },
            ]}
          />
          <TaskList
            tasks={[
              "Released Devcon CTF as a live platform for anyone to play at any moment",
              "Created 12 new challenges for Devconnect Argentina",
              "Added Season 2 (Buenos Aires) to our CTF platform",
            ]}
          />
        </>
      ),
      links: [{ url: "https://ctf.buidlguidl.com/", label: "Website" }],
    },
    {
      id: "workshops",
      title: "Workshops",
      content: (
        <>
          <p className="text-white/70 text-sm leading-relaxed mt-0 mb-6">
            We played a key role at Devconnect Buenos Aires, planning and executing BuidlGuidl{"'"}s four-day Builder
            Bootcamp.
          </p>

          <div className="mb-6 p-4 border border-white/10 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-white uppercase tracking-widest">
                Builder Bootcamp • Nov 18-21
              </span>
              <a
                href="https://devconnect.buidlguidl.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-white text-xs transition-colors"
              >
                View schedule →
              </a>
            </div>
            <InlineStats
              stats={[
                { value: "4", label: "days" },
                { value: "19", label: "workshops" },
              ]}
            />
          </div>

          <TerminalLabel>BuidlGuidl Sessions at Devconnect</TerminalLabel>
          <TaskList
            tasks={["Unveiling Scaffold UI", "Leveraging AI to build on Ethereum", "Capture the Flag session"]}
          />

          <TerminalLabel>Other Events</TerminalLabel>
          <TaskList
            tasks={[
              <>
                <DarkLink href="https://x.com/AyaMiyagotchi/status/1977798777634459923">Dev support</DarkLink> in
                Bhutan, to help their government anchor its national digital identity system on Ethereum
              </>,
              <>
                <DarkLink href="https://x.com/ethereumph/status/1963214275515961700">
                  Ethereum fundamentals workshop
                </DarkLink>{" "}
                for instructors at universities
              </>,
              <>
                <DarkLink href="https://www.aigentsbcn.xyz/">aigentsbcn</DarkLink> event support
              </>,
            ]}
          />
        </>
      ),
    },
  ],
};

const ECOSYSTEM: RecapSectionData = {
  id: "ecosystem",
  track: "Dapp Building Track",
  title: "Ecosystem Collabs",
  intro: (
    <>
      Partnering with key players to expand Ethereum{"'"}s reach. In 2025, we partnered with ENS, Arbitrum, Geode Labs,
      and Ethereum.org building grant platforms, cohort programs, and developer resources that benefit the broader
      ecosystem.
    </>
  ),
  tabs: [
    {
      id: "ens",
      title: "ENS Grants",
      content: (
        <>
          <p className="text-white/70 text-sm leading-relaxed mt-0 mb-6">
            ETH Grants platform implemented adhoc for ENS in 2024, we improved it with milestone-based USDC grants in
            2025 and enhanced admin workflow.
          </p>
          <TaskList
            tasks={[
              "Launched the new milestone-based USDC grants features",
              "Added milestones and enhanced admin workflow to ETH grants",
            ]}
          />
          <TerminalLabel>2025 Stats</TerminalLabel>
          <InlineStats
            stats={[
              { value: "4.1k", label: "visitors" },
              { value: "42 of 241", label: "grants approved" },
              { value: "$200k+", label: "granted" },
            ]}
          />
        </>
      ),
      links: [{ url: "https://builder.ensgrants.xyz/", label: "Website" }],
    },
    {
      id: "arbitrum",
      title: "Arbitrum",
      content: (
        <>
          <p className="text-white/70 text-sm leading-relaxed mt-0 mb-6">
            Launched the Arbitrum Cohort to build dapps on Arbitrum. Currently developing two projects for the
            ecosystem.
          </p>
          <TerminalLabel>Projects in Development</TerminalLabel>
          <div className="grid gap-4">
            <ProjectCard
              title="DevCreds"
              description="Developer reputation dapp for the Arbitrum ecosystem"
              linkUrl="https://dev-creds.vercel.app/"
            />
            <ProjectCard
              title="Governance Dashboard"
              description="Dashboard for Arbitrum governance participation and tracking"
            />
          </div>
        </>
      ),
      links: [{ url: "https://arbitrum.buidlguidl.com/", label: "Website" }],
    },
    {
      id: "jobboard",
      title: "Job Board",
      content: (
        <>
          <p className="text-white/70 text-sm leading-relaxed mt-0 mb-6">
            Curated job board connecting developers with opportunities across the Ethereum ecosystem.
          </p>
          <TaskList tasks={["Launched the Ethereum Job Board in collaboration with Geode Labs"]} />
          <TerminalLabel>2025 Stats</TerminalLabel>
          <InlineStats stats={[{ value: "8.1k", label: "visitors" }]} />
        </>
      ),
      links: [{ url: "https://www.ethereumjobboard.com/", label: "Website" }],
    },
    {
      id: "ethereumorg",
      title: "Ethereum.org",
      content: (
        <TaskList
          tasks={[
            <>
              Built the <DarkLink href="https://ethereum.org/collectibles/">Collectibles</DarkLink> site for
              contributors
            </>,
            <>
              Speedrun Ethereum and Scaffold-ETH are featured as main themes on{" "}
              <DarkLink href="https://ethereum.org/developers/">ethereum.org/developers/</DarkLink>
            </>,
          ]}
        />
      ),
    },
  ],
};

const NODE_INFRA: RecapSectionData = {
  id: "node-infra",
  track: "Infrastructure Track",
  title: "Ecosystem Support",
  navTitle: "Ecosystem Support",
  intro: (
    <>
      We improved the BuidlGuidl Client UX and launched a free distributed mainnet RPC that{"'"}s powered by BG Clients.
    </>
  ),
  tabs: [
    {
      id: "bg-client",
      title: "BG Client",
      content: (
        <>
          <p className="text-white/70 text-sm leading-relaxed mt-0 mb-6">
            One line command to run an Ethereum full node, with a terminal dashboard for monitoring.
          </p>

          <TaskList
            tasks={[
              "Started powering the BG RPC with a network of BG Clients",
              <>
                Added Telegram alerts and a{" "}
                <DarkLink href="https://apps.apple.com/us/app/bg-client/id6756518184">Mac and iOS app</DarkLink> for
                monitoring node status
              </>,
              "Kept the execution (Geth & Reth) and consensus (Prysm & Lighthouse) clients current all year.",
            ]}
          />
        </>
      ),
      links: [
        { url: "https://client.buidlguidl.com/", label: "Website" },
        { url: "https://github.com/BuidlGuidl/buidlguidl-client", label: "Github" },
      ],
    },
    {
      id: "bg-rpc",
      title: "BG RPC",
      content: (
        <>
          <p className="text-white/70 text-sm leading-relaxed mt-0 mb-6">
            A community-powered RPC endpoint served by BG Client nodes. It started from an empty repo in January 2025
            and grew into the pool service that routes, verifies, and pays for every request.
          </p>

          <TerminalLabel>Request Routing</TerminalLabel>
          <TaskList
            tasks={[
              "Built the pool from scratch: socket.io check-ins, a live map of connected nodes, and per-request timeouts",
              "Raced each request across three nodes and returned the fastest response, later tuned down to a single node with random spot check sets",
              "Added a caching layer for eth_call, eth_getBalance, eth_getStorageAt, eth_getBlockByNumber and friends, keyed by params and block number",
              "Added dynamic timeouts for slower methods and a retry when the first node times out",
            ]}
          />

          <TerminalLabel>Trust & Verification</TerminalLabel>
          <TaskList
            tasks={[
              "Compared responses key by key across nodes and raised Telegram alerts on mismatches",
              "Blocked block number spoofing by checking each node's reported head against the mode of the pool",
              "Scored nodes fast or slow by their timeout percentage over the trailing week, and filtered out stale or partial check-ins",
            ]}
          />

          <TerminalLabel>Rewards & Public Data</TerminalLabel>
          <TaskList
            tasks={[
              "Replaced owner points with Bread minted on Base: staged to a database, batched, ENS resolved, with mint capacity preflight and nonce error recovery",
              <>
                Shipped the endpoints behind the client and{" "}
                <DarkLink href="https://rpc.buidlguidl.com/">rpc.buidlguidl.com</DarkLink>: /poolNodes, /nodeContinents,
                /rpcsitestats, /yournodes with per-node system stats, and /watchdog
              </>,
            ]}
          />
        </>
      ),
      links: [{ url: "https://rpc.buidlguidl.com/", label: "Website" }],
    },
  ],
};

const MISC: RecapSectionData = {
  id: "misc",
  track: "Dapp Building Track",
  title: "Miscellaneous Projects",
  navTitle: "Misc",
  intro: (
    <>
      Side projects and experiments. Beyond our main initiatives, we maintained useful tools, explored emerging
      platforms like Farcaster MiniApps, and started ideating programs for 2026.
    </>
  ),
  stats: [
    { value: "~20k", label: "", growth: "Abi Ninja users" },
    { value: "3", label: "", growth: "Farcaster Miniapps" },
  ],
  tabs: [
    {
      id: "abi-ninja",
      title: "Abi Ninja",
      content: (
        <>
          <p className="text-white/70 text-sm leading-relaxed mt-0 mb-6">
            Our tool for interacting with any smart contract on any EVM chain. In 2025, we focused on maintenance and
            incremental improvements to keep it running smoothly.
          </p>
          <TerminalLabel>Highlights</TerminalLabel>
          <TaskList tasks={["Maintenance and small features"]} />
        </>
      ),
      links: [{ url: "https://abi.ninja/", label: "Website" }],
    },
    {
      id: "farcaster",
      title: "Farcaster Miniapps",
      content: (
        <>
          <p className="text-white/70 text-sm leading-relaxed mt-0 mb-6">
            Exploring the miniapp ecosystem after our Farcaster day at Devconnect by launching experimental games and
            interactive experiences.
          </p>
          <TerminalLabel>Launched Miniapps</TerminalLabel>
          <TaskList
            tasks={[
              <>
                <span className="text-white">Advent Calendar</span> — Holiday-themed miniapp game (
                <DarkLink href="https://farcaster.xyz/miniapps/mhdgdBnT4lR0/adventsfun-calendar">Open Miniapp</DarkLink>
                )
              </>,
              <>
                <span className="text-white">Snowman / Not Snowman</span> — Spinoff farcaster drawing game (
                <DarkLink href="https://farcaster.xyz/miniapps/q-h3sLIksfzg/snowman--not-snowman">
                  Open Miniapp
                </DarkLink>
                )
              </>,
              <>
                <span className="text-white">Bubble Tap</span> — Spinoff Interactive tap game (
                <DarkLink href="https://farcaster.xyz/miniapps/LTGZffIuAcG7/bubble-tap-game">Open Miniapp</DarkLink>)
              </>,
            ]}
          />
        </>
      ),
    },
    {
      id: "ideation",
      title: "2026 Ideation",
      content: (
        <>
          <p className="text-white/70 text-sm leading-relaxed mt-0 mb-6">
            Exploring new directions and prototyping programs to launch in the coming year.
          </p>
          <TerminalLabel>Prototypes & Concepts</TerminalLabel>
          <div className="grid gap-4">
            <ProjectCard
              title="6-Month Acceleration Program"
              description="Ideation and prototyping of a structured builder program"
              linkUrl="https://hack-combinator.vercel.app/"
              linkLabel="View prototype"
            />
            <ProjectCard
              title="Enterprise Education"
              description="Mockup for enterprise-focused Ethereum education"
              linkUrl="https://eadc.ethereum.org/"
              linkLabel="View prototype"
            />
          </div>
        </>
      ),
    },
  ],
};

export const RECAP_SECTIONS: RecapSectionData[] = [SPEEDRUN, SCAFFOLD_ETH, EDUCATIONAL, ECOSYSTEM, NODE_INFRA, MISC];
