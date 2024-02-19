import { sql } from "@vercel/postgres";
import { PostCampaign } from "../../../types/campaign";
import { CampaignsRow, UsersRow } from "../../../types/db";
import { getCampaignCreator } from "./getCampaignCreator";
import { NewUser, User } from "../../../types/user";

export async function postCampaign(campaign: PostCampaign): Promise<{
  campaign_id: number;
  creator: NewUser | User;
}> {
  const existingUser =
    await sql<UsersRow>`SELECT user_id FROM users WHERE address=${campaign.owner};`;

  const isNewUser = existingUser.rowCount === 0;
  let user_id: number;
  if (isNewUser) {
    const newUser =
      await sql<UsersRow>`INSERT INTO users (address) VALUES (${campaign.owner}) RETURNING user_id;`;
    user_id = newUser.rows[0].user_id;
  } else {
    user_id = existingUser.rows[0].user_id;
  }

  // Insert campaign
  const returnedCampaign =
    await sql<CampaignsRow>`INSERT INTO campaigns (name, goal_usd, end_date, user_id)
          VALUES (${campaign.name}, ${campaign.goalUSD || null}, TO_TIMESTAMP(${
      campaign.endDate || null
    }), ${user_id})
          RETURNING campaign_id`;

  const campaign_id = returnedCampaign.rows[0].campaign_id;

  // Insert allowed tokens for the campaign
  const values: string[] = [];
  campaign.allowedTokens.forEach((tokenKey) => {
    values.push(`(${campaign_id}, '${tokenKey}')`);
  });

  let query = `INSERT INTO campaign_allowed_tokens (campaign_id, token_key) VALUES ${values.join(
    ", "
  )}`;

  await sql.query(query);

  if (isNewUser) {
    return { campaign_id, creator: { user_id, address: campaign.owner } };
  }

  const creator = await getCampaignCreator(user_id);

  return { campaign_id, creator };
}
