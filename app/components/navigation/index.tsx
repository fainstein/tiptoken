"use client";
import { Box, Link, Typography } from "@mui/material";
import ConnectWalletButton from "../connect-wallet";
import React from "react";
import NextLink from "next/link";

const Navigation = () => {
  return (
    <Box
      component="nav"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding={6}
    >
      <Link href="/" variant="h4" component={NextLink}>
        Tip Token
      </Link>
      <ConnectWalletButton />
    </Box>
  );
};

export default Navigation;
