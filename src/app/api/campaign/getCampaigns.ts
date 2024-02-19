import { sql } from "@vercel/postgres";
import { CampaignsRow } from "../../../types/db";

export async function getCampaigns(start = 0): Promise<CampaignsRow[]> {
  const { rows } =
    await sql<CampaignsRow>`SELECT campaign_id, name, goal_usd, end_date, total_received, user_id FROM campaigns ORDER BY created_at LIMIT 20 OFFSET ${start};`;
  return rows;
}

export async function getCampaign(campaignId: number): Promise<CampaignsRow> {
  const { rows } =
    await sql<CampaignsRow>`SELECT * FROM campaigns WHERE campaign_id=${campaignId};`;
  return rows[0];
}

export async function getUserCampaigns(
  userId: number
): Promise<CampaignsRow[]> {
  const { rows } =
    await sql<CampaignsRow>`SELECT * from campaigns WHERE user_id=${userId};`;
  return rows;
}
