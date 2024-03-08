import { Address } from "viem";
import { Token } from "./ethereum";

export interface BaseCampaign {
  name: string;
  allowedTokens: Token[];
  cafeCryptoUnit: number;
  goalCC: number | null;
  endDate: Date | null;
  owner: Address;
  description: string;
}

export interface OpenCampaign extends BaseCampaign {
  campaignId: number;
  totalReceived: number;
  createdAt: Date;
  userId: number;
}

export interface CompleteCampaign extends BaseCampaign {
  campaignId: number;
  totalReceived: number;
  createdAt: Date;
  isOpen: boolean;
  userId: number;
}

export type StoredCampaign = OpenCampaign | CompleteCampaign;

export interface NewCampaign extends BaseCampaign {
  signature: Address;
}

export interface PostCampaign extends Omit<BaseCampaign, "allowedTokens"> {
  allowedTokens: string[];
}
