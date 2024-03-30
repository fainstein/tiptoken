"use client";
import React from "react";
import ConnectWalletModal from "./connect-wallet-modal";
import { Typography } from "@mui/material";
import { useScopedI18n } from "@/locales/client";
import { useAccount } from "wagmi";
import { trimAddress } from "@/utils/address";

const ConnectWalletButton = () => {
  const [openConnectModal, setOpenConnectModal] = React.useState(false);
  const { isConnected: isConnectedWagmi, address } = useAccount();
  const [isConnected, setIsConnected] = React.useState(false);
  const t = useScopedI18n("navigation");

  React.useEffect(() => {
    // This way to update state, after components are rendered, solves a hydration issue
    setIsConnected(true);
  }, [isConnectedWagmi]);

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
