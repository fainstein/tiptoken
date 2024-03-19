import { Box,  Typography } from "@mui/material";
import { getOpenCampaigns } from "../api/campaign/getCampaigns";
import CampaignCard from "../../components/home/campaign-card";
import { getI18n } from "@/locales/server";

export default async function Home() {
  const campaigns = await getOpenCampaigns();
  const t = await getI18n();
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={4}
      sx={{ width: { xs: "100%", md: "60%" } }}
    >
      <Typography variant="h5">{t("open.cafecryptos")}</Typography>
      <Box display="flex" flexDirection="column" gap={3}>
        {campaigns.map((campaign) => (
          <CampaignCard campaign={campaign} key={campaign.campaignId} />
        ))}
      </Box>
    </Box>
  );
}
