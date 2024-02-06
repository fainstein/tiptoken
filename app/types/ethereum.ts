import { Address } from "viem";

export type ChainId = number;
export type TokenAddress = Address;

export interface Token {
  address: TokenAddress;
  symbol: string;
  name: string;
  decimals: number;
  chainId: ChainId;
}

export type TokenList = Record<ChainId, Record<TokenAddress, Token>>;

export interface AmountsOfToken {
  amount: bigint;
  amountInUnits: string;
  amountUSD: number;
}

export interface SupportCampaignTx {
  txHash: Address;
  token: Token;
  amount: AmountsOfToken;
  from: Address;
  to: Address;
  timestamp: number;
  chainId: ChainId;
  gas: AmountsOfToken;
}

export interface Network {
  name: string;
  chainId: ChainId;
  abbreviation: string;
}

export type NetworkList = Record<string, Network>;
