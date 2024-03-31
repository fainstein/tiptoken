import CampaignData from "@/components/user/campaign-data";
import { useI18n } from "@/locales/client";
import { StoredCampaign } from "@/types/campaign";
import { Box, Typography } from "@mui/material";
import React from "react";

interface CampaignsListProps {
  campaigns: StoredCampaign[];
}

const CampaignsList = ({ campaigns }: CampaignsListProps) => {
  const t = useI18n();

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Typography variant="h5">{t("user.yourcc")}</Typography>
      {campaigns.map((campaign) => (
        <CampaignData campaign={campaign} key={campaign.campaignId} />
      ))}
    </Box>
  );
};

export default CampaignsList;
