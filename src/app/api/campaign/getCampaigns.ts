import { sql } from "@vercel/postgres";
import { CampaignsRow } from "../../../types/db";
import { StoredCampaign } from "@/types/campaign";
import { transformCampaigns } from "../transform/campaign";

export async function getOpenCampaigns(start = 0): Promise<StoredCampaign[]> {
  const { rows } =
    await sql<CampaignsRow>`SELECT campaign_id, name, goal_usd, end_date, total_received, user_id FROM campaigns WHERE is_open=true ORDER BY created_at LIMIT 20 OFFSET ${start};`;

  return transformCampaigns(rows);
}

export async function getCampaign(campaignId: number): Promise<StoredCampaign> {
  const { rows } =
    await sql<CampaignsRow>`SELECT * FROM campaigns WHERE campaign_id=${campaignId};`;
  return transformCampaigns(rows)[0];
}

export async function getUserCampaigns(
  userId: number
): Promise<StoredCampaign[]> {
  const { rows } =
    await sql<CampaignsRow>`SELECT * from campaigns WHERE user_id=${userId};`;
  return transformCampaigns(rows);
}
