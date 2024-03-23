"use client";
import React from "react";
import ConnectWalletModal from "./connect-wallet-modal";
import { Typography } from "@mui/material";
import { useScopedI18n } from "@/locales/client";
import { useAccount } from "wagmi";
import { trimAddress } from "@/utils/address";

const ConnectWalletButton = () => {
  const [openConnectModal, setOpenConnectModal] = React.useState(false);
  const { isConnected, address } = useAccount();
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
        {isConnected && address ? trimAddress({ address }) : t("connect")}
      </Typography>
    </>
  );
};

export default ConnectWalletButton;
