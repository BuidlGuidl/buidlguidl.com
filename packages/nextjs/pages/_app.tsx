import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import PlausibleProvider from "next-plausible";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";
import "~~/styles/globals.css";
import "~~/styles/prism-theme.css";

const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
  // Start with dark theme on server & initial client render to avoid hydration mismatch
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    // After mount, check localStorage for user's preference
    const stored = localStorage.getItem("usehooks-ts-dark-mode");
    if (stored !== null) {
      setIsDarkTheme(JSON.parse(stored));
    }
  }, []);

  return (
    <PlausibleProvider domain="buidlguidl.com">
      <WagmiConfig config={wagmiConfig}>
        <NextNProgress />
        <RainbowKitProvider
          chains={appChains.chains}
          avatar={BlockieAvatar}
          theme={isDarkTheme ? darkTheme() : lightTheme()}
        >
          <main className="font-space-grotesk">
            <Component {...pageProps} />
          </main>
          <Toaster />
        </RainbowKitProvider>
      </WagmiConfig>
    </PlausibleProvider>
  );
};

export default ScaffoldEthApp;
