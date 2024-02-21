import React from "react";
import { StoredCampaign } from "@/types/campaign";
import { Box, LinearProgress, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { DateTime } from "luxon";
import Image from "next/image";
import CafeCrypto from "@/../public/CafeCrypto.png";

const CampaignCard = ({ campaign }: { campaign: StoredCampaign }) => {
  const daysLeft = campaign.endDate
    ? DateTime.fromJSDate(campaign.endDate).diffNow("days").days.toFixed(0)
    : undefined;

  return (
    <Link
      href={`/campaign/${campaign.campaignId}`}
      variant="h4"
      component={NextLink}
    >
      <Box border="1px solid" borderRadius={4} py={2} px={4}>
        <Typography variant="h4">{campaign.name}</Typography>
        <Box display="flex" gap={1} alignItems="center">
          <Typography variant="body1">{campaign.totalReceived}</Typography>
          <Image
            alt="cafe-crypto-unit"
            src={CafeCrypto}
            width={24}
            height={24}
          />
          <Typography variant="body1">'s received</Typography>
        </Box>
        {campaign.goalUSD && (
          <>
            <LinearProgress
              variant="determinate"
              value={campaign.totalReceived / campaign.goalUSD}
            />
            <Typography textAlign="right" variant="body1">
              Goal: {campaign.goalUSD} TT
            </Typography>
          </>
        )}
        {campaign.endDate && (
          <>
            <Typography textAlign="right" variant="body1">
              {daysLeft && +daysLeft > 0
                ? `Ends in ${daysLeft} days`
                : `Campaign ended`}
            </Typography>
          </>
        )}
      </Box>
    </Link>
  );
};

export default CampaignCard;
