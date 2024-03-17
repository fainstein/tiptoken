import { Box, Grid, Typography } from "@mui/material";
import { getOpenCampaigns } from "../api/campaign/getCampaigns";
import CampaignCard from "../../components/home/campaign-card";
import { getI18n } from "@/locales/server";

export default async function Home() {
  const campaigns = await getOpenCampaigns();
  const t = await getI18n();
  return (
    <Box display="flex" flexDirection="column" gap={8}>
      <Typography variant="h2" textAlign="left">
        {t("open.cafecryptos")}
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
