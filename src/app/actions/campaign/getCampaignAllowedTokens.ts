import { db } from "@/lib/kysely";
import { StoredCampaignAllowedChains } from "@/types/db";

export async function getCampaignAllowedChains(
  campaignId: number
): Promise<StoredCampaignAllowedChains[]> {
  const allowedChains = await db
    .selectFrom("campaign_allowed_chains")
    .selectAll()
    .where("campaign_id", "=", campaignId)
    .execute();

  return allowedChains;
}
