import { TokenList } from "../types/ethereum";
import { networkList } from "./networks";

export const tokenList: TokenList = {
  [networkList.polygon.chainId]: {
    "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063": {
      address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
      chainId: networkList.polygon.chainId,
      decimals: 18,
      name: "Dai Stablecoin",
      symbol: "DAI",
    },
    "0x0000000000000000000000000000000000001010": {
      address: "0x0000000000000000000000000000000000001010",
      chainId: networkList.polygon.chainId,
      decimals: 18,
      name: "Matic Token",
      symbol: "MATIC",
    },
    "0xc2132d05d31c914a87c6611c10748aeb04b58e8f": {
      address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      chainId: networkList.polygon.chainId,
      decimals: 6,
      name: "Tether USD",
      symbol: "USDT",
    },
  },
};
