import { Address } from "viem";
import { Token } from "./ethereum";

export interface BaseCampaign {
  name: string;
  allowedTokens: Token[];
  goalUSD?: number;
  endDate?: number;
  owner: Address;
}

export interface StoredCampaign extends BaseCampaign {
  campaign_id: number;
  totalReceived: number;
}

export interface NewCampaign extends BaseCampaign {
  signature: Address;
}

export interface PostCampaign extends Omit<BaseCampaign, "allowedTokens"> {
  allowedTokens: string[];
}
