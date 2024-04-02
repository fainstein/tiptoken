"use client";
import React from "react";
import { CampaignWithOwner, StoredCampaign } from "@/types/campaign";
import {
  Box,
  Button,
  LinearProgress,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import Image from "next/image";
import CafeCrypto from "@/../public/CafeCrypto.png";
import { styled } from "styled-components";
import { useScopedI18n } from "@/locales/client";
import theme from "@/ui/theme/theme";
import { trimAddress } from "@/utils/address";
import CCLogo from "@/ui/images/cc-logo";

const StyledCampaignCard = styled(Box).attrs({ boxShadow: 7 })`
  border: 1px solid ${"#edeef6"};
  border-radius: ${theme.spacing(4)};
  padding: ${theme.spacing(4)};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(4)};
  transition: box-shadow 300ms;
  flex: 1;
  &:hover {
    box-shadow: ${theme.shadows[4]};
  }
`;

const CampaignCard = ({ campaign }: { campaign: CampaignWithOwner }) => {
  const t = useScopedI18n("campaign.card");

  return (
    <StyledCampaignCard>
      <Box display="flex" justifyContent="space-between" alignItems="start">
        <Typography variant="body1" fontWeight={500}>
          {campaign.name}
        </Typography>
        <Link
          variant="h4"
          component={NextLink}
          color="inherit"
          href={`/campaign/${campaign.name}`}
          display="flex"
        >
          <Button variant="contained" color="secondary">
            {t("contribute")}
          </Button>
        </Link>
      </Box>
      <Box display="flex" gap={10}>
        <Box display="flex" flexDirection="column">
          <Typography
            variant="body1"
            display="flex"
            alignItems="center"
            gap={1}
          >
            {t("value", {
              img: <CCLogo />,
            })}
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            ${campaign.cafeCryptoUnit.toFixed(2)}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="body1">{t("createdby")}</Typography>
          <Tooltip title={campaign.owner}>
            <Typography variant="body2" fontWeight={500}>
              {campaign.user_name || trimAddress({ address: campaign.owner })}
            </Typography>
          </Tooltip>
        </Box>
      </Box>
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
      {campaign.description && (
        <Typography variant="caption">{campaign.description}</Typography>
      )}
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
          <Box display="flex" gap={1} alignItems="center" justifyContent="end">
            <Typography variant="body1">Goal: {campaign.goalCC}</Typography>
            <CCLogo />

            <Typography variant="body1">
              (${campaign.goalCC * campaign.cafeCryptoUnit})
            </Typography>
          </Box>
        </>
      )}
    </StyledCampaignCard>
  );
};

export default CampaignCard;
