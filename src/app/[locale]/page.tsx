import { Box, Grid, Typography } from "@mui/material";

import CampaignCard from "../../components/home/campaign-card";
import { getI18n } from "@/locales/server";
import {
  getPopularCampaigns,
  getRecentCampaigns,
} from "../actions/campaign/getCampaigns";

export default async function Home() {
  const popularCampaigns = await getPopularCampaigns();
  const recentCampaigns = await getRecentCampaigns();
  const t = await getI18n();
  return (
    <Box display="flex" flexDirection="column" gap={12}>
      <Box display="flex" flexDirection="column" gap={4}>
        <Typography variant="h5">{t("home.topcc")}</Typography>
        <Grid container spacing={3}>
          {popularCampaigns.map((campaign) => (
            <Grid item key={campaign.campaignId} xs={12} md={6} lg={4}>
              <CampaignCard campaign={campaign} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box display="flex" flexDirection="column" gap={4}>
        <Typography variant="h5">{t("home.recentcc")}</Typography>
        <Grid container spacing={3}>
          {recentCampaigns.map((campaign) => (
            <Grid item key={campaign.campaignId} xs={12} md={6} lg={4}>
              <CampaignCard campaign={campaign} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
