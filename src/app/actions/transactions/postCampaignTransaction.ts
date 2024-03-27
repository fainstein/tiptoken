import { db } from "@/lib/kysely";
import { PostcampaignTransaction } from "@/types/transactions";
import { revalidatePath } from "next/cache";

export async function postCampaignTransaction({
  campaignId,
  ccAmount,
  chainId,
  hash,
  senderAddress,
  tokenAddress,
  tokenAmount,
  senderMessage,
}: PostcampaignTransaction) {
  await db
    .insertInto("campaign_transactions")
    .values({
      campaign_id: campaignId,
      cc_amount: ccAmount,
      chain_id: chainId,
      hash,
      sender_address: senderAddress,
      token_address: tokenAddress,
      token_amount: tokenAmount,
      sender_message: senderMessage,
    })
    .execute();

  await db
    .updateTable("campaigns")
    .set((eb) => ({ total_received: eb("total_received", "+", ccAmount) }))
    .where("campaign_id", "=", campaignId)
    .execute();

  // This was causing a rare error in the browser console
  // revalidatePath("/", "layout");
}
