'use client'
import { useScopedI18n } from "@/locales/client";
import { StoredCampaign } from "@/types/campaign";
import CCLogo from "@/ui/images/cc-logo";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";

interface CampaignDataProps {
  campaign: StoredCampaign;
}

const CampaignData = ({ campaign }: CampaignDataProps) => {
  const t = useScopedI18n("campaign.card");

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${campaign.name}-content`}
        id={`${campaign.name}-header`}
      >
        <Typography variant="body1">{campaign.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex" flexDirection="column">
          <Typography variant="body1">{t("received")}</Typography>
          <Box display="flex" gap={1} alignItems="center">
            <Typography variant="body2" fontWeight={500}>
              {campaign.totalReceived}
            </Typography>
            <CCLogo />
            {campaign.totalReceived * campaign.cafeCryptoUnit > 0 && (
              <Typography variant="body2">
                (${campaign.totalReceived * campaign.cafeCryptoUnit})
              </Typography>
            )}
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default CampaignData;
