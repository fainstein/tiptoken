import { getCampaign } from "@/app/api/campaign/getCampaigns";
import SupportCampaignForm from "./support-campaign-form";
import { Box, Typography } from "@mui/material";

export default async function Campaign({
  params,
}: {
  params: { campaignId: string };
}) {
  const campaign = await getCampaign(Number(params.campaignId));

  return (
    <Box display="flex" gap={12} flexDirection="column">
      <Typography variant="h3">Support this campaign</Typography>
      <SupportCampaignForm campaign={campaign} />
    </Box>
  );
}
