import { tokenList } from "@/constants/tokenList";
import { StoredCampaign } from "@/types/campaign";
import { CampaignAllowedTokensRow, CampaignsTableReturnType } from "@/types/db";
import { Token } from "@/types/ethereum";
import { Address } from "viem";

export const transformCampaigns = ({
  campaigns,
  allowedTokens,
  ownerAddress,
}: {
  campaigns: CampaignsTableReturnType[];
  allowedTokens: CampaignAllowedTokensRow[];
  ownerAddress: string;
}): StoredCampaign[] => {
  const parsedAllowedTokens = allowedTokens.reduce<Token[]>((acc, tokenKey) => {
    const [chainId, tokenAddress] = tokenKey.token_key.split("-");
    const token = tokenList[+chainId][tokenAddress as Address];

    acc.push(token);
    return acc;
  }, []);

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
    }) => ({
      campaignId: campaign_id,
      createdAt: created_at,
      isOpen: is_open,
      name,
      totalReceived: total_received,
      endDate: end_date,
      cafeCryptoUnit: cafe_crypto_unit,
      goalCC: goal_cc,
      allowedTokens: parsedAllowedTokens,
      owner: ownerAddress as Address,
      userId: user_id,
      description,
    })
  );

  return parsedCampaign;
};
