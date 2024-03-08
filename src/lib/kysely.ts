import {
  CampaignTransactionsTable,
  CampaignsTable,
  UsersTable,
} from "@/types/db";
import { createKysely } from "@vercel/postgres-kysely";

interface Database {
  campaigns: CampaignsTable;
  campaign_transactions: CampaignTransactionsTable;
  users: UsersTable;
}

export const db = createKysely<Database>();
