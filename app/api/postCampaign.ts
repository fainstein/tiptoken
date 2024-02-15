import { sql } from "@vercel/postgres";
import { PostCampaign } from "../types/campaign";
import { CampaignsRow } from "../types/db";
import { getCampaignCreator } from "./getCampaignCreator";

export async function postCampaign(campaign: PostCampaign) {
  // Insert campaign
  const returnedCampaign =
    await sql<CampaignsRow>`INSERT INTO campaigns (name, goal_usd, end_date, owner)
          VALUES (${campaign.name}, ${campaign.goalUSD || null}, TO_TIMESTAMP(${
      campaign.endDate || null
    }), ${campaign.owner})
          RETURNING campaign_id, user_id;`;

  const campaign_id = returnedCampaign.rows[0].campaign_id;

  // Insert allowed tokens for the campaign
  const values: string[] = [];
  campaign.allowedTokens.forEach((tokenKey, i) => {
    values.push(`(${campaign_id}, '${tokenKey}')`);
  });

  let query = `INSERT INTO campaign_allowed_tokens (campaign_id, token_key) VALUES ${values.join(
    ", "
  )}`;

  await sql.query(query);

  const userId = returnedCampaign.rows[0].user_id;

  const creator = await getCampaignCreator(userId);

  return { campaign_id, creator };
}
