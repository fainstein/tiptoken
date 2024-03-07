import { TokenList, TokenType } from "../types/ethereum";

export const tokenList: TokenList = {
  [1]: {
    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": {
      address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      chainId: 1,
      decimals: 18,
      name: "Ethereum",
      symbol: "ETH",
      type: TokenType.NATIVE,
    },
  },
  [137]: {
    "0x0000000000000000000000000000000000001010": {
      address: "0x0000000000000000000000000000000000001010",
      chainId: 137,
      decimals: 18,
      name: "Matic Token",
      symbol: "MATIC",
      type: TokenType.NATIVE,
    },
    "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063": {
      address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
      chainId: 137,
      decimals: 18,
      name: "Dai Stablecoin",
      symbol: "DAI",
      type: TokenType.ERC20,
    },
    "0xc2132d05d31c914a87c6611c10748aeb04b58e8f": {
      address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      chainId: 137,
      decimals: 6,
      name: "Tether USD",
      symbol: "USDT",
      type: TokenType.ERC20,
    },
    "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619": {
      address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      chainId: 137,
      decimals: 18,
      name: "Wrapped Ether",
      symbol: "WETH",
      type: TokenType.ERC20,
    },
  },
  [10]: {},
  [42161]: {},
};
