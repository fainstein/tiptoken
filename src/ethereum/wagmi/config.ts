import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { mainnet, optimism, polygon, arbitrum } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

export const config = createConfig({
  chains: [mainnet, optimism, polygon, arbitrum],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: http(),
    [optimism.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
  },
  connectors: [
    injected(),
    // walletConnect({
    //   projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string,
    // }),
  ],
});
