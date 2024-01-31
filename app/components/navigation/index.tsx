"use client";
import ConnectWalletButton from "../connect-wallet";
import React from "react";

const Navigation = () => {
  return (
    <nav className="flex justify-between p-6 items-center bg-transparent backdrop-blur-sm w-full fixed">
      <h2 className="opacity-100">Tip Token</h2>
      <div className="flex gap-2">
        <ConnectWalletButton />
      </div>
    </nav>
  );
};

export default Navigation;
