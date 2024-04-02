import { db } from "@/lib/kysely";
import { BaseCampaign } from "@/types/campaign";
import { revalidatePath } from "next/cache";
import { createUser } from "../user/createUser";

export async function postCampaign(campaign: BaseCampaign): Promise<string> {
  const user_id = await createUser(campaign.owner);

  // Insert campaign

  const returnedCampaign = await db
    .insertInto("campaigns")
    .values({
      name: campaign.name,
      title: campaign.title,
      cafe_crypto_unit: campaign.cafeCryptoUnit,
      goal_cc: campaign.goalCC || null,
      user_id,
      description: campaign.description,
      is_open: true,
      total_received: 0,
    })
    .returning(["name", "campaign_id"])
    .executeTakeFirst();

  if (!returnedCampaign) {
    throw new Error("Unable to create campaign");
  }

  const { campaign_id, name } = returnedCampaign;

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

  return name;
}
