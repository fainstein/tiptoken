import WalletContext from "@/context/wallet-context";
import { useContext } from "react";

const useWeb3Service = () => {
  const walletContext = useContext(WalletContext);
  return walletContext.web3Service;
};

export default useWeb3Service;
