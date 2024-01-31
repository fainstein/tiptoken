"use client";
import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import ConnectWalletModal from "./connect-wallet-modal";

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
        <button
          onClick={() => disconnect()}
          className="border py-2 px-4 border-white rounded-xl"
        >
          Disconnect
        </button>
      ) : (
        <button
          onClick={() => setOpenConnectModal(true)}
          className="border py-2 px-4 border-white rounded-xl"
          disabled={account.isConnecting}
        >
          Connect
        </button>
      )}
    </>
  );
};

export default ConnectWalletButton;
