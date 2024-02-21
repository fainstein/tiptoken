import { Box, Grid, Typography } from "@mui/material";
import { getOpenCampaigns } from "./api/campaign/getCampaigns";
import CampaignCard from "./home/campaign-card";

export default async function Home() {
  const campaigns = await getOpenCampaigns();

  return (
    <Box display="flex" flexDirection="column" gap={8}>
      <Typography variant="h2" textAlign="left">
        Open campaigns
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {campaigns.map((campaign) => (
          <Grid item xs={12} key={campaign.campaignId}>
            <CampaignCard campaign={campaign} />
          </Grid>
        ))}
      </Box>
    </Box>
  );
}
