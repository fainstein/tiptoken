import { Address } from "viem";
import { Token } from "./ethereum";

export interface BaseCampaign {
  name: string;
  allowedTokens: Token[];
  goalUSD?: number;
  endDate?: Date;
  owner: Address;
}

export interface StoredCampaign extends BaseCampaign {
  campaignId: number;
  totalReceived: number;
  createdAt: Date;
  isOpen: boolean;
  userId: number;
}

export interface NewCampaign extends BaseCampaign {
  signature: Address;
}

export interface PostCampaign extends Omit<BaseCampaign, "allowedTokens"> {
  allowedTokens: string[];
}
