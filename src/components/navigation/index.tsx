"use client";
import { Box, Button, Link } from "@mui/material";
import ConnectWalletButton from "../connect-wallet";
import React from "react";
import NextLink from "next/link";
import { ContainerBox } from "@/ui/components/container-box";
import Image from "next/image";
import CafeCrypto from "../../../public/CafeCrypto.png";
import LocaleSwitch from "./locale-switcher";
import { useI18n } from "@/locales/client";

const Navigation = () => {
  const t = useI18n();
  return (
    <Box
      component="nav"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding={6}
    >
      <Link href="/" variant="h4" component={NextLink}>
        <Box display="flex" gap={2} alignItems="center">
          <Image
            width={40}
            height={40}
            src={CafeCrypto}
            alt="cafe-crypto-logo"
          />
          CafeCrypto
        </Box>
      </Link>
      <ContainerBox alignItems="center" gap={3}>
        <Button variant="contained" href="/create" LinkComponent={NextLink}>
          {t("create")}
        </Button>
        <ConnectWalletButton />
        <LocaleSwitch />
      </ContainerBox>
    </Box>
  );
};

export default Navigation;
