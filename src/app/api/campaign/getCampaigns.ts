import { CampaignAllowedTokensRow, CampaignsTable } from "../../../types/db";
import { OpenCampaign, StoredCampaign } from "@/types/campaign";
import { transformCampaigns } from "../transform/campaign";
import { getCampaignAvailableTokens } from "./getCampaignAvailableTokens";
import { getUser } from "../user/getUser";
import { db } from "@/lib/kysely";

const getCampaignExtraData = async (
  campaignId: number,
  userId: number
): Promise<{
  allowedTokens: CampaignAllowedTokensRow[];
  ownerAddress: string;
}> => {
  const allowedTokens = await getCampaignAvailableTokens(campaignId);
  const user = await getUser(userId);
  return { allowedTokens, ownerAddress: user.address };
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
    allowedTokens: [],
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
  const { allowedTokens, ownerAddress } = await getCampaignExtraData(
    campaign_id,
    user_id
  );

  return transformCampaigns({
    campaigns: [campaign],
    allowedTokens,
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
    allowedTokens: [],
    ownerAddress: "0x",
  });
}
