import React from "react";
import { StoredCampaign } from "@/types/campaign";
import { Box, LinearProgress, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import Image from "next/image";
import CafeCrypto from "@/../public/CafeCrypto.png";

const CampaignCard = ({ campaign }: { campaign: StoredCampaign }) => {
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
          <Typography variant="body1">
            received (${campaign.totalReceived * campaign.cafeCryptoUnit})
          </Typography>
        </Box>
        {campaign.goalCC && (
          <>
            <LinearProgress
              variant="determinate"
              value={
                campaign.totalReceived <= campaign.goalCC
                  ? (campaign.totalReceived * 100) / campaign.goalCC
                  : 100
              }
            />
            <Box
              display="flex"
              gap={1}
              alignItems="center"
              justifyContent="end"
            >
              <Typography variant="body1">Goal: {campaign.goalCC}</Typography>
              <Image
                alt="cafe-crypto-unit"
                src={CafeCrypto}
                width={24}
                height={24}
              />
              <Typography variant="body1">
                (${campaign.goalCC * campaign.cafeCryptoUnit})
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Link>
  );
};

export default CampaignCard;
