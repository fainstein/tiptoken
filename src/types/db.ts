export interface CampaignsRow {
  campaign_id: number;
  name: string;
  cafe_crypto_unit: number;
  goal_cc?: number;
  end_date?: Date;
  user_id: number;
  total_received: number;
  is_open: boolean;
  created_at: Date;
}

export interface CampaignAllowedTokensRow {
  campaign_id: number;
  token_key: string;
}

export interface UsersRow {
  user_id: number;
  address: string;
  name?: string;
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
