import { StoredCampaign } from "@/types/campaign";
import { CampaignsRow } from "@/types/db";

export const transformCampaigns = (
  campaigns: CampaignsRow[]
): StoredCampaign[] => {
  const parsedCampaign: StoredCampaign[] = campaigns.map(
    ({
      campaign_id,
      created_at,
      is_open,
      name,
      total_received,
      end_date,
      goal_usd,
      user_id,
    }) => ({
      campaignId: campaign_id,
      createdAt: created_at,
      isOpen: is_open,
      name,
      totalReceived: total_received,
      endDate: end_date,
      goalUSD: goal_usd,
      allowedTokens: [], // TODO
      owner: "0x", // TODO
      userId: user_id,
    })
  );

  return parsedCampaign;
};
