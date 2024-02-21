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
      goal_cc,
      cafe_crypto_unit,
      user_id,
    }) => ({
      campaignId: campaign_id,
      createdAt: created_at,
      isOpen: is_open,
      name,
      totalReceived: total_received,
      endDate: end_date,
      cafeCryptoUnit: cafe_crypto_unit,
      goalCC: goal_cc,
      allowedTokens: [], // TODO
      owner: "0x", // TODO
      userId: user_id,
    })
  );

  return parsedCampaign;
};
