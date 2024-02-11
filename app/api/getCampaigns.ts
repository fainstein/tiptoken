import { sql } from "@vercel/postgres";
import { StoredCampaign } from "../types/campaign";

export async function getCampaigns(start = 0): Promise<StoredCampaign[]> {
  const { rows } =
    await sql`SELECT campaign_id, name, goal_usd, end_date, total_received, owner FROM campaigns ORDER BY created_at LIMIT 20 OFFSET ${start};`;
  return rows as StoredCampaign[];
}

export async function getCampaign(campaignId: number): Promise<StoredCampaign> {
  const { rows } =
    await sql`SELECT * FROM campaigns WHERE campaign_id=${campaignId};`;
  return rows[0] as StoredCampaign;
}
