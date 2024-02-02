"use client";
import { Box, Typography } from "@mui/material";
import ConnectWalletButton from "../connect-wallet";
import React from "react";

const Navigation = () => {
  return (
    <Box
      component="nav"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding={6}
    >
      <Typography variant="h4">Tip Token</Typography>
      <ConnectWalletButton />
    </Box>
  );
};

export default Navigation;
