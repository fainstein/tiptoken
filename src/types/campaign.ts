import { Address } from "viem";
import { Token } from "./ethereum";

export interface BaseCampaign {
  name: string;
  allowedTokens: Token[];
  cafeCryptoUnit: number;
  goalCC?: number;
  endDate?: Date;
  owner: Address;
  description: string
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
