import {
  CampaignAllowedChainsTable,
  CampaignTransactionsTable,
  CampaignsTable,
  UsersTable,
} from "@/types/db";
import { createKysely } from "@vercel/postgres-kysely";

interface Database {
  campaigns: CampaignsTable;
  campaign_transactions: CampaignTransactionsTable;
  users: UsersTable;
  campaign_allowed_chains: CampaignAllowedChainsTable;
}

export const db = createKysely<Database>();
