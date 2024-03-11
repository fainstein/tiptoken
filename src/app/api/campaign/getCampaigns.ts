import { OpenCampaign, StoredCampaign } from "@/types/campaign";
import { transformCampaigns } from "../transform/campaign";
import { getUser } from "../user/getUser";
import { db } from "@/lib/kysely";
import { StoredCampaignAllowedChains } from "@/types/db";
import { getCampaignAllowedChains } from "./getCampaignAllowedTokens";

const getCampaignExtraData = async (
  campaignId: number,
  userId: number
): Promise<{
  allowedChains: StoredCampaignAllowedChains[];
  ownerAddress: string;
}> => {
  const allowedChains = await getCampaignAllowedChains(campaignId);
  const user = await getUser(userId);
  return { allowedChains, ownerAddress: user.address };
};

export async function getOpenCampaigns(start = 0): Promise<OpenCampaign[]> {
  const campaigns = await db
    .selectFrom("campaigns")
    .select([
      "campaign_id",
      "name",
      "cafe_crypto_unit",
      "goal_cc",
      "end_date",
      "user_id",
      "total_received",
      "is_open",
      "description",
      "created_at",
    ])
    .where("is_open", "=", true)
    .orderBy("created_at")
    .limit(20)
    .offset(start)
    .execute();

  return transformCampaigns({
    campaigns: [...campaigns],
    allowedChains: [],
    ownerAddress: "0x",
  });
}

export async function getCampaign(
  campaignId: number
): Promise<StoredCampaign | undefined> {
  const campaign = await db
    .selectFrom("campaigns")
    .selectAll()
    .where("campaign_id", "=", campaignId)
    .executeTakeFirst();

  if (!campaign) {
    return;
  }

  const { campaign_id, user_id } = campaign;
  const { allowedChains, ownerAddress } = await getCampaignExtraData(
    campaign_id,
    user_id
  );

  return transformCampaigns({
    campaigns: [campaign],
    allowedChains,
    ownerAddress,
  })[0];
}

export async function getUserCampaigns(
  userId: number
): Promise<StoredCampaign[]> {
  const campaigns = await db
    .selectFrom("campaigns")
    .selectAll()
    .where("user_id", "=", userId)
    .execute();

  return transformCampaigns({
    campaigns,
    allowedChains: [],
    ownerAddress: "0x",
  });
}
