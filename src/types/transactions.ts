import { Address } from "viem";
import { ChainId, TokenAddress } from "./ethereum";

export interface PostcampaignTransaction {
  campaignId: number;
  ccAmount: number;
  chainId: ChainId;
  hash: Address;
  senderAddress: Address;
  tokenAddress: TokenAddress;
  tokenAmount: bigint;
  senderMessage: string;
}
