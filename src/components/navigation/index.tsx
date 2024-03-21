"use client";
import { Box, Button, Link, Typography, useMediaQuery } from "@mui/material";
import ConnectWalletButton from "../connect-wallet";
import React from "react";
import NextLink from "next/link";
import { ContainerBox } from "@/ui/components/container-box";
import Image from "next/image";
import CafeCrypto from "../../../public/CafeCrypto.png";
import LocaleSwitcher from "./locale-switcher";
import { useI18n } from "@/locales/client";
import theme from "@/ui/theme/theme";
import MobileMenu from "./mobile-menu";

const Navigation = () => {
  const t = useI18n();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      component="nav"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding={6}
    >
      <Link href="/" component={NextLink}>
        <Box display="flex" gap={2} alignItems="center">
          <Image
            width={40}
            height={40}
            src={CafeCrypto}
            alt="cafe-crypto-logo"
          />
          <Typography variant="h4" display={mobile ? "none" : ""}>
            CafeCrypto
          </Typography>
        </Box>
      </Link>
      {mobile ? (
        <MobileMenu />
      ) : (
        <ContainerBox alignItems="center" gap={6}>
          <Button variant="contained" href="/create" LinkComponent={NextLink}>
            {t("create")}
          </Button>
          <ConnectWalletButton />
          <LocaleSwitcher />
        </ContainerBox>
      )}
    </Box>
  );
};

export default Navigation;
