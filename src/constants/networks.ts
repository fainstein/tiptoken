import { NetworkList } from "../types/ethereum";

export const networkList: NetworkList = {
  [1]: {
    name: "Ethereum",
    chainId: 1,
    abbreviation: "ETH",
  },
  [42161]: {
    name: "Arbitrum",
    chainId: 42161,
    abbreviation: "ARB",
  },
  [137]: {
    name: "Polygon",
    chainId: 137,
    abbreviation: "MATIC",
  },
  [10]: {
    name: "Optimism",
    chainId: 10,
    abbreviation: "OVM",
  },
};
