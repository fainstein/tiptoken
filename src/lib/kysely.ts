import { CampaignTransactionsTable } from "@/types/db";
import { createKysely } from "@vercel/postgres-kysely";

interface Database {
  campaign_transactions: CampaignTransactionsTable;
}

export const db = createKysely<Database>();
