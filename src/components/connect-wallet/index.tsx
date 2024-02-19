"use client";
import React from "react";
import { useAccount } from "wagmi";
import ConnectWalletModal from "./connect-wallet-modal";
import { Button, CircularProgress } from "@mui/material";
import { trimAddress } from "@/src/utils/address";

const ConnectWalletButton = () => {
  const { isConnected, isConnecting, address } = useAccount();
  const [openConnectModal, setOpenConnectModal] = React.useState(false);

  return (
    <>
      <ConnectWalletModal
        open={openConnectModal}
        setOpen={(shouldOpen) => setOpenConnectModal(shouldOpen)}
      />
      <Button onClick={() => setOpenConnectModal(true)}>
        {isConnected && address ? trimAddress({ address }) : "Connect"}
      </Button>
    </>
  );
};

export default ConnectWalletButton;
