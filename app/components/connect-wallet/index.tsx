"use client";
import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import ConnectWalletModal from "./connect-wallet-modal";
import { Button } from "@mui/material";

const ConnectWalletButton = () => {
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const [openConnectModal, setOpenConnectModal] = React.useState(false);

  return (
    <>
      <ConnectWalletModal
        open={openConnectModal}
        setOpen={(shouldOpen) => setOpenConnectModal(shouldOpen)}
      />
      {account.isConnected ? (
        <Button onClick={() => disconnect()}>Disconnect</Button>
      ) : (
        <Button onClick={() => setOpenConnectModal(true)}>Connect</Button>
      )}
    </>
  );
};

export default ConnectWalletButton;
