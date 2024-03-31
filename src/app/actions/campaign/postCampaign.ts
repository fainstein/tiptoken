import { db } from "@/lib/kysely";
import { BaseCampaign } from "@/types/campaign";
import { User } from "@/types/user";
import { revalidatePath } from "next/cache";

export async function postCampaign(campaign: BaseCampaign): Promise<number> {
  const existingUser = await db
    .selectFrom("users")
    .select(["user_id", "name"])
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

  const allowedChainsValues = campaign.allowedChainIds.map((chain_id) => ({
    campaign_id,
    chain_id,
  }));

  // Insert allowed chains

  await db
    .insertInto("campaign_allowed_chains")
    .values(allowedChainsValues)
    .execute();

  revalidatePath("/");
  revalidatePath("/user");

  return campaign_id;
}
