import { sql } from "@vercel/postgres";
import { PostCampaign } from "../types/campaign";

export async function postCampaign(campaign: PostCampaign) {
  // Insert campaign
  const returnedCampaignId =
    await sql`INSERT INTO campaigns (name, goal_usd, end_date, owner)
          VALUES (${campaign.name}, ${campaign.goalUSD || null}, TO_TIMESTAMP(${
      campaign.endDate || null
    }), ${campaign.owner})
          RETURNING campaign_id;`;

  const campaign_id = returnedCampaignId.rows[0].campaign_id;

  // Insert allowed tokens for the campaign
  const values: string[] = [];
  campaign.allowedTokens.forEach((tokenKey, i) => {
    values.push(`(${campaign_id}, '${tokenKey}')`);
  });

  let query = `INSERT INTO campaign_allowed_tokens (campaign_id, token_key) VALUES ${values.join(
    ", "
  )}`;

  await sql.query(query);
}
