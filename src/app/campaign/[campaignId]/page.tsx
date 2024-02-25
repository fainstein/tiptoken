import { getCampaign } from "@/app/api/campaign/getCampaigns";
import SupportCampaignForm from "./support-campaign-form";
import { Box, Typography } from "@mui/material";
import { TokenAddress } from "@/types/ethereum";
import { getTokenPrices } from "@/app/api/defillama/getTokenPrices";

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

  return (
    <Box display="flex" gap={12} flexDirection="column">
      <Typography variant="h3">Support this campaign</Typography>
      <SupportCampaignForm
        campaign={campaign}
        handleGetTokensPrices={handleGetTokensPrices}
      />
    </Box>
  );
}
