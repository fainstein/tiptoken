import { CampaignAllowedTokensRow } from "@/types/db";
import { sql } from "@vercel/postgres";

export async function getCampaignAvailableTokens(
  campaignId: number
): Promise<CampaignAllowedTokensRow[]> {
  const { rows } =
    await sql<CampaignAllowedTokensRow>`SELECT * FROM campaign_allowed_tokens WHERE campaign_id=${campaignId};`;
  return rows;
}
