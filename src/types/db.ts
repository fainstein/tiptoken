import { Generated } from "kysely";

export interface CampaignsTable {
  campaign_id: Generated<number>;
  name: string;
  cafe_crypto_unit: number;
  goal_cc: number | null;
  end_date: Date | null;
  user_id: number;
  total_received: number;
  is_open: boolean;
  created_at: Generated<Date>;
  description: string;
}

export type CampaignsTableReturnType = Omit<
  CampaignsTable,
  "campaign_id" | "created_at"
> & {
  campaign_id: number;
  created_at: Date;
};

export interface CampaignAllowedChainsTable {
  campaign_id: Generated<number>;
  chain_id: number;
}

export interface StoredCampaignAllowedChains
  extends Omit<CampaignAllowedChainsTable, "campaign_id"> {
  campaign_id: number;
}

export interface UsersTable {
  user_id: Generated<number>;
  address: string;
  name: string | null;
}

export interface StoredUser extends Omit<UsersTable, "user_id"> {
  user_id: number;
}

export enum ValidPlatforms {
  FACEBOOK = "facebook",
  INSTAGRAM = "instagram",
  X = "x",
  YOUTUBE = "youtube",
}

export interface SocialMediaLinksRow {
  link_id: number;
  user_id: number;
  platform: `${ValidPlatforms}`;
  username: string;
}

export interface CampaignTransactionsTable {
  transaction_id: Generated<number>;
  hash: string;
  sender_address: string;
  campaign_id: number;
  created_at: Generated<Date>;
  chain_id: number;
  token_address: string;
  token_amount: bigint;
  cc_amount: number;
  sender_message: string;
}
