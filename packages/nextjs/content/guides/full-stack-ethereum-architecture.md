---
title: "The Cleanest Full-Stack Ethereum App Architecture (2026)"
date: "2026-07-28"
description: "How to structure a full-stack Ethereum app in 2026: the Scaffold-ETH 2 monorepo layout for contracts, frontend, tests, and an indexer, and how the pieces stay in sync through typed hooks."
faqs:
  - question: "Should I use Hardhat or Foundry for the contracts?"
    answer: "Both are first-class in Scaffold-ETH 2, and create-eth asks which one you want. Foundry is fast and lets you write tests in Solidity, which many contract developers prefer. Hardhat is TypeScript based. The frontend and the overall structure are identical either way, so pick by preference and switch later if you change your mind."
  - question: "Do I need an indexer, or are direct RPC calls enough?"
    answer: "Direct reads through the typed hooks are enough for current state, like a balance or a single mapping value. Reach for an indexer when you need history, aggregation, or queries across many events, for example a leaderboard, a list of all trades, or a user activity feed. Most apps start without one and add it when a screen needs data the chain does not hand you cheaply."
  - question: "Ponder or a subgraph?"
    answer: "A subgraph on The Graph is the established option with hosted infrastructure. Ponder is a newer TypeScript-native indexer you run yourself, and it is often simpler for a smaller app. Both plug into the same frontend, so the choice does not change the rest of your architecture."
  - question: "Is a monorepo overkill for a small dapp?"
    answer: "No. The whole point is that the contracts and the frontend share types and deployment state, so even a one-contract app benefits. You are not adding process, you are removing the manual wiring between the two halves that usually goes stale."
  - question: "Can I use this structure in production?"
    answer: "Yes. It is a starting structure, not a toy. You still harden the contracts, add your own CI, and swap in production RPC and an indexer, but the layout is the same one real teams ship."
---

You have a contract that works. Now you need the rest of the app: a frontend, wallet connection, a way to read and write the contract with the right types, tests, deploy scripts, and maybe a data layer. Search "full-stack Ethereum app structure" and you get a different pile of libraries in every result, most of them wired together by hand in a way that quietly rots the moment your contract changes.

This is the structure that holds up. It is the layout [Scaffold-ETH 2](https://scaffoldeth.io) uses, and the reason to start from it is not that it saves you an afternoon of setup, it is that it keeps the two halves of your app, the contracts and the frontend, in sync automatically. This guide covers the layout and the decisions. For the step-by-step, the [Scaffold-ETH 2 docs](https://docs.scaffoldeth.io) go deeper on each part.

## The reference layout

A full-stack Ethereum app is really two projects that need to agree with each other: the onchain side and the frontend. The clean way to hold them together is a monorepo with one package for each.

```
my-dapp/
  packages/
    hardhat/            # or foundry
      contracts/        # your Solidity
      deploy/           # deploy scripts
      test/             # contract tests
      hardhat.config.ts
    nextjs/
      app/              # routes and pages
      components/       # UI, including the prebuilt web3 components
      hooks/            # typed contract hooks
      contracts/        # generated: deployedContracts.ts, externalContracts.ts
      scaffold.config.ts
```

Two packages, one repo. The onchain package (`hardhat`, or `foundry` if you prefer) owns your Solidity, your deploy scripts, and your contract tests. The `nextjs` package owns everything the user touches. That is the entire top-level shape, and it is worth resisting the urge to make it more clever than that.

## The part that usually rots, and how this avoids it

Here is the problem with wiring your own stack. Your frontend needs your contract's address and ABI to talk to it. Copy those by hand and they drift: you redeploy, the address changes, you tweak a function signature, and now your frontend is calling a contract that no longer exists in the shape it expects. Most "full-stack" tutorials leave you maintaining that seam forever.

In this layout the deploy step writes the contract's address and typed ABI into `packages/nextjs/contracts/deployedContracts.ts`, and the frontend reads from there. So the frontend is typed against the contracts you actually deployed. When you change a function, TypeScript tells you what broke in the UI before you ever run it.

You talk to the contracts through typed hooks rather than assembling calls by hand:

```tsx
const { data: totalSupply } = useScaffoldReadContract({
  contractName: "YourToken",
  functionName: "totalSupply",
});

const { writeContractAsync } = useScaffoldWriteContract({ contractName: "YourToken" });
```

There are matching hooks for events and history, and a set of prebuilt components (an address display, a balance, a wallet connect button) so you are not rebuilding the same web3 UI on every project. Underneath it is Wagmi, Viem, and RainbowKit, but you rarely reach that far down.

## Reading data: RPC calls or an indexer

The most common architecture question, and the one the generic answers get wrong, is where your data comes from. There are two paths, and you want both in your head before you pick.

For **current state**, read straight from the chain through the hooks above. A token balance, the current owner, a value in a mapping: these are one call and you do not need anything else.

For **history and aggregation**, you need an indexer. The chain will not cheaply hand you "every trade this week" or "this user's activity feed" or a leaderboard sorted by score, because that means scanning and aggregating events. An indexer listens to your contract's events, writes them to a database, and gives your frontend a normal query API. In this structure that is either a **subgraph** on The Graph or **Ponder**, a TypeScript-native indexer you run yourself. Both slot in behind the same frontend, so adding one later does not disturb the rest of the app.

The rule of thumb: start without an indexer, and add one the first time a screen needs data the chain does not give you in a single read.

## Contracts, tests, and deploys

The onchain package keeps the three onchain concerns together. Your Solidity lives in `contracts/`, your deploy scripts in `deploy/`, and your tests in `test/`. Because deploys and the frontend share the generated contract data, a local deploy immediately makes your contract available to the UI on a local chain, with an auto-generated interface to poke at every function before you have designed a single screen.

Whether that package is Hardhat or Foundry is a preference, not an architecture decision. Foundry is fast and keeps your tests in Solidity; Hardhat is TypeScript end to end. The layout, the frontend, and the connective types are the same either way.

## Why not just wire it yourself

You can. Turborepo, your own Next.js, ethers or Viem by hand, a wallet library, a types setup, a deploy pipeline: it is all public. The reason not to is that none of it is your product. You would spend the first week building and then maintaining the seam between contracts and frontend that this structure keeps current for you, and you would be doing it on a stack you have to keep patched yourself.

Starting point:

```bash
npx create-eth@latest
```

That gives you the tree above, already wired, on the current 2026 toolchain.

## Going deeper

- The [Scaffold-ETH 2 docs](https://docs.scaffoldeth.io) cover each part in detail: the hooks, the components, deploying, and adding a data layer.
- New to this and want the path that gets you here? Start with [how to build on Ethereum](/guides/how-to-build-on-ethereum), which walks the learn-then-build journey from the beginning.

## FAQ

**Should I use Hardhat or Foundry for the contracts?**
Both are first-class in Scaffold-ETH 2, and create-eth asks which you want. Foundry is fast and lets you write tests in Solidity; Hardhat is TypeScript based. The frontend and the overall structure are identical either way, so pick by preference and switch later if you change your mind.

**Do I need an indexer, or are direct RPC calls enough?**
Direct reads through the typed hooks are enough for current state, like a balance or a single mapping value. Reach for an indexer when you need history, aggregation, or queries across many events, for example a leaderboard, a list of all trades, or an activity feed. Most apps start without one and add it when a screen needs data the chain does not hand you cheaply.

**Ponder or a subgraph?**
A subgraph on The Graph is the established option with hosted infrastructure. Ponder is a newer TypeScript-native indexer you run yourself, and it is often simpler for a smaller app. Both plug into the same frontend, so the choice does not change the rest of your architecture.

**Is a monorepo overkill for a small dapp?**
No. The point is that the contracts and the frontend share types and deployment state, so even a one-contract app benefits. You are not adding process, you are removing the manual wiring between the two halves that usually goes stale.

**Can I use this structure in production?**
Yes. It is a starting structure, not a toy. You still harden the contracts, add your own CI, and swap in production RPC and an indexer, but the layout is the same one real teams ship.
