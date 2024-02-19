"use client";
import { Box, Button, Link, Typography } from "@mui/material";
import ConnectWalletButton from "../connect-wallet";
import React from "react";
import NextLink from "next/link";
import { ContainerBox } from "@/ui/components/container-box";

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
      <ContainerBox alignItems="center" gap={3}>
        <Button variant="contained" href="/create" LinkComponent={NextLink}>
          Create
        </Button>
        <ConnectWalletButton />
      </ContainerBox>
    </Box>
  );
};

export default Navigation;
