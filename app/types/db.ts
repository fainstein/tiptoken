export interface CampaignsRow {
  campaign_id: number;
  name: string;
  goal_usd?: number;
  end_date?: number;
  user_id: number;
  total_received: number;
  is_open: boolean;
  created_at: number;
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
