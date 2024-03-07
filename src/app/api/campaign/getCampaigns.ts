import { sql } from "@vercel/postgres";
import { CampaignAllowedTokensRow, CampaignsRow } from "../../../types/db";
import { StoredCampaign } from "@/types/campaign";
import { transformCampaigns } from "../transform/campaign";
import { getCampaignAvailableTokens } from "./getCampaignAvailableTokens";
import { getUser } from "../user/getUser";

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

export async function getOpenCampaigns(start = 0): Promise<StoredCampaign[]> {
  const { rows: campaigns } =
    await sql<CampaignsRow>`SELECT campaign_id, name, cafe_crypto_unit, goal_cc, end_date, total_received, user_id FROM campaigns WHERE is_open=true ORDER BY created_at LIMIT 20 OFFSET ${start};`;

  return transformCampaigns({
    campaigns,
    allowedTokens: [],
    ownerAddress: "0x",
  });
}

export async function getCampaign(
  campaignId: number
): Promise<StoredCampaign | undefined> {
  const { rows: campaigns } =
    await sql<CampaignsRow>`SELECT * FROM campaigns WHERE campaign_id=${campaignId};`;

  if (!campaigns.length) {
    return;
  }

  const { campaign_id, user_id } = campaigns[0];
  const { allowedTokens, ownerAddress } = await getCampaignExtraData(
    campaign_id,
    user_id
  );

  return transformCampaigns({
    campaigns,
    allowedTokens,
    ownerAddress,
  })[0];
}

export async function getUserCampaigns(
  userId: number
): Promise<StoredCampaign[]> {
  const { rows: campaigns } =
    await sql<CampaignsRow>`SELECT * from campaigns WHERE user_id=${userId};`;

  return transformCampaigns({
    campaigns,
    allowedTokens: [],
    ownerAddress: "0x",
  });
}
