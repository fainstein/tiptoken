import { sql } from "@vercel/postgres";
import { PostCampaign } from "../../../types/campaign";
import { getCampaignCreator } from "./getCampaignCreator";
import { NewUser, User } from "../../../types/user";
import { db } from "@/lib/kysely";

export async function postCampaign(campaign: PostCampaign): Promise<{
  campaign_id: number;
  creator: NewUser | User;
}> {
  const existingUser = await db
    .selectFrom("users")
    .select("user_id")
    .where("address", "=", campaign.owner)
    .executeTakeFirst();

  let user_id: number | undefined;
  if (!existingUser) {
    const newUser = await db
      .insertInto("users")
      .values({ address: campaign.owner })
      .returning("user_id")
      .executeTakeFirst();
    user_id = newUser?.user_id;
  } else {
    user_id = existingUser.user_id;
  }

  if (!user_id) {
    throw new Error("Unable to create user");
  }

  // Insert campaign

  const returnedCampaign = await db
    .insertInto("campaigns")
    .values({
      name: campaign.name,
      cafe_crypto_unit: campaign.cafeCryptoUnit,
      goal_cc: campaign.goalCC || null,
      user_id,
      description: campaign.description,
      is_open: true,
      total_received: 0,
    })
    .returning("campaign_id")
    .executeTakeFirst();

  if (!returnedCampaign) {
    throw new Error("Unable to create campaign");
  }

  const campaign_id = returnedCampaign.campaign_id;

  // Insert allowed tokens for the campaign
  const values: string[] = [];
  campaign.allowedTokens.forEach((tokenKey) => {
    values.push(`(${campaign_id}, '${tokenKey}')`);
  });

  let query = `INSERT INTO campaign_allowed_tokens (campaign_id, token_key) VALUES ${values.join(
    ", "
  )}`;

  await sql.query(query);

  if (!existingUser) {
    return { campaign_id, creator: { user_id, address: campaign.owner } };
  }

  const creator = await getCampaignCreator(user_id);

  return { campaign_id, creator };
}
