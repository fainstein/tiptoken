import {
  CampaignAllowedChainsTable,
  CampaignTransactionsTable,
  CampaignsTable,
  SocialMediaLinksTable,
  UsersTable,
} from "@/types/db";
import { createKysely } from "@vercel/postgres-kysely";

interface Database {
  campaigns: CampaignsTable;
  campaign_transactions: CampaignTransactionsTable;
  users: UsersTable;
  campaign_allowed_chains: CampaignAllowedChainsTable;
  social_media_links: SocialMediaLinksTable;
}

export const db = createKysely<Database>();
