import { Address } from "viem";

export interface BaseCampaign {
  name: string;
  allowedChainIds: number[];
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
