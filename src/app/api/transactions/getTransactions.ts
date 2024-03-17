import { db } from "@/lib/kysely";

export async function getTransactions(campaignId: number) {
  return await db
    .selectFrom("campaign_transactions")
    .selectAll("campaign_transactions")
    .where("campaign_id", "=", campaignId)
    .execute();
}
