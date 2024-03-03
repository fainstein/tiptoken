import * as React from "react";
import Web3Service from "@/services/web3Service";

export type WalletContextValue = {
  web3Service: Web3Service;
};

export const WalletContextDefaultValue: WalletContextValue = {
  web3Service: new Web3Service(),
};

const WalletContext = React.createContext(WalletContextDefaultValue);

export default WalletContext;
