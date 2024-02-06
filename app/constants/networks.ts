import { NetworkList } from "../types/ethereum";

export const networkList: NetworkList = {
  mainnet: {
    name: "Ethereum Mainnet",
    chainId: 1,
    abbreviation: "ETH",
  },
  arbitrum: {
    name: "Arbitrum",
    chainId: 42161,
    abbreviation: "ARB",
  },
  polygon: {
    name: "Polygon",
    chainId: 137,
    abbreviation: "MATIC",
  },
  optimism: {
    name: "Optimism",
    chainId: 10,
    abbreviation: "OVM",
  },
};
