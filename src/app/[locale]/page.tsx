import { Box, Grid, Typography } from "@mui/material";
import { getOpenCampaigns } from "../api/campaign/getCampaigns";
import CampaignCard from "../../components/home/campaign-card";
import { getI18n } from "@/locales/server";

export default async function Home() {
  const campaigns = await getOpenCampaigns();
  const t = await getI18n();
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Typography variant="h5">{t("open.cafecryptos")}</Typography>
      <Grid container spacing={3}>
        {campaigns.map((campaign) => (
          <Grid item key={campaign.campaignId} xs={12} md={6} lg={4}>
            <CampaignCard campaign={campaign} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
