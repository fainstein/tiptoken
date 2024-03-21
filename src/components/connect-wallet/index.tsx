"use client";
import React from "react";
import ConnectWalletModal from "./connect-wallet-modal";
import { Button, Typography } from "@mui/material";
import { useScopedI18n } from "@/locales/client";

const ConnectWalletButton = () => {
  const [openConnectModal, setOpenConnectModal] = React.useState(false);
  const t = useScopedI18n("navigation");
  return (
    <>
      <ConnectWalletModal
        open={openConnectModal}
        setOpen={(shouldOpen) => setOpenConnectModal(shouldOpen)}
      />
      <Typography
        sx={{ cursor: "pointer" }}
        variant="body1"
        onClick={() => setOpenConnectModal(true)}
      >
        {t("connect")}
      </Typography>
    </>
  );
};

export default ConnectWalletButton;
