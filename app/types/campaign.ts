import { Address } from "viem";
import { AmountsOfToken, Token, TokenAddress, TokenList } from "./ethereum";

export interface CampaignDetails {
  name: string;
  goalUSD?: number;
  endDate?: number;
  allowedTokens: TokenList;
}

export interface CampaignSummary {
  name: string;
  goalUSD?: number;
  endDate?: number;
  totalRecevied: Record<TokenAddress, AmountsOfToken>;
  owner: Address;
}
