import { getCampaign } from "@/app/api/campaign/getCampaigns";
import SupportCampaignForm from "./support-campaign-form";
import { Box, Typography } from "@mui/material";
import { NetworkList, Token, TokenAddress } from "@/types/ethereum";
import { getTokenPrices } from "@/app/api/defillama/getTokenPrices";
import { networkList } from "@/constants/networks";

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

export default async function Campaign({
  params,
}: {
  params: { campaignId: string };
}) {
  const campaign = await getCampaign(Number(params.campaignId));

  const allowedNetworks = campaign.allowedTokens.reduce<NetworkList>(
    (acc, token) => {
      const newAcc = { ...acc };
      if (!newAcc[token.chainId]) {
        newAcc[token.chainId] = networkList[token.chainId];
      }
      return newAcc;
    },
    {}
  );

  const defaultNetwork = Object.values(allowedNetworks)[0];
  const defaultToken = campaign.allowedTokens.find(
    (tokenItem) => tokenItem.chainId === defaultNetwork.chainId
  )!; //defaultToken should ALWAYS exist

  return (
    <Box display="flex" gap={12} flexDirection="column">
      <Typography variant="h3">Support this campaign</Typography>
      <SupportCampaignForm
        campaign={campaign}
        handleGetTokensPrices={handleGetTokensPrices}
        allowedNetworks={allowedNetworks}
        defaultNetwork={defaultNetwork}
        defaultToken={defaultToken}
      />
    </Box>
  );
}
