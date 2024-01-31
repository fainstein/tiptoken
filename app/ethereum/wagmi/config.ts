"use client";
import { http, createConfig } from "wagmi";
import { mainnet, optimism, polygon, sepolia } from "wagmi/chains";
import {
  coinbaseWallet,
  injected,
  safe,
  walletConnect,
} from "wagmi/connectors";

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

export const config = createConfig({
  chains: [mainnet, optimism, polygon, sepolia],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [optimism.id]: http(),
    [polygon.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [
    injected(),
    walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string }),
  ],
});
