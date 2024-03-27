import { db } from "@/lib/kysely";
import { unstable_noStore as noStore } from "next/cache";

export async function getTransactions(campaignId: number) {
  noStore();
  return await db
    .selectFrom("campaign_transactions")
    .selectAll("campaign_transactions")
    .where("campaign_id", "=", campaignId)
    .orderBy("campaign_transactions.created_at desc")
    .execute();
}
