import { tokenList } from "@/constants/tokenList";
import { StoredCampaign } from "@/types/campaign";
import {
  CampaignsTableReturnType,
  StoredCampaignAllowedChains,
} from "@/types/db";
import { Token } from "@/types/ethereum";
import { Address } from "viem";

export const transformCampaigns = ({
  campaigns,
  allowedChains,
  ownerAddress,
}: {
  campaigns: CampaignsTableReturnType[];
  allowedChains: StoredCampaignAllowedChains[];
  ownerAddress: string;
}): StoredCampaign[] => {
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
      description,
    }) => {
      const allowedChainIds = allowedChains
        .filter(
          ({ campaign_id: stored_campaign_id }) =>
            stored_campaign_id === campaign_id
        )
        .map((chain) => chain.chain_id);

      return {
        campaignId: campaign_id,
        createdAt: created_at,
        isOpen: is_open,
        name,
        totalReceived: total_received,
        endDate: end_date,
        cafeCryptoUnit: cafe_crypto_unit,
        goalCC: goal_cc,
        allowedChainIds,
        owner: ownerAddress as Address,
        userId: user_id,
        description,
      };
    }
  );

  return parsedCampaign;
};
