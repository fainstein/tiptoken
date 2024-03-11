import { getCampaign } from "@/app/api/campaign/getCampaigns";
import SupportCampaignForm from "./support-campaign-form";
import { Box, Typography } from "@mui/material";
import { NetworkList, TokenAddress } from "@/types/ethereum";
import { getTokenPrices } from "@/app/api/defillama/getTokenPrices";
import { networkList } from "@/constants/networks";
import { redirect } from "next/navigation";
import { postCampaignTransaction } from "@/app/api/transactions/postCampaignTransaction";
import { PostcampaignTransaction } from "@/types/transactions";
import { tokenList } from "@/constants/tokenList";

const handleGetTokensPrices = async ({
  networkName,
  tokens,
}: {
  networkName: string;
  tokens: TokenAddress[];
}) => {
  "use server";
  return await getTokenPrices({ networkName, tokens });
};

const handlePostCampaignTransaction = async (
  campaignTransactionData: PostcampaignTransaction
) => {
  "use server";

  await postCampaignTransaction(campaignTransactionData);
};

export default async function Campaign({
  params,
}: {
  params: { campaignId: string };
}) {
  const campaign = await getCampaign(Number(params.campaignId));

  if (!campaign) {
    redirect("/");
  }

  const allowedNetworks = Object.values(networkList).filter((network) =>
    campaign.allowedChainIds.includes(network.chainId)
  );
  const defaultNetwork = allowedNetworks[0];
  const defaultToken = Object.values(tokenList[defaultNetwork.chainId])[0];

  return (
    <Box display="flex" gap={12} flexDirection="column">
      <Typography variant="h3">Support this campaign</Typography>
      <SupportCampaignForm
        campaign={campaign}
        handleGetTokensPrices={handleGetTokensPrices}
        handlePostCampaignTransaction={handlePostCampaignTransaction}
        allowedNetworks={allowedNetworks}
        defaultNetwork={defaultNetwork}
        defaultToken={defaultToken}
      />
    </Box>
  );
}
