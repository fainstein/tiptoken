import { Token, TokenType } from "@/types/ethereum";
import useContractService from "./services/useContractService";
import React from "react";
import { Address } from "viem";

const useTokenBalance = ({
  token,
  walletAddress,
}: {
  token: Token;
  walletAddress?: Address;
}) => {
  const contractService = useContractService();
  const [balance, setBalance] = React.useState<bigint>();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const getBalance = async () => {
      if (walletAddress) {
        setIsLoading(true);
        if (token.type === TokenType.ERC20) {
          const contract = contractService.getERC20TokenInstance(token);
          const balance = await contract.read.balanceOf([walletAddress]);
          setBalance(balance);
        } else if (token.type === TokenType.NATIVE) {
          const balance = await contractService.providerService
            .getPublicClient(token.chainId)
            .getBalance({ address: walletAddress });
          setBalance(balance);
        }
        setIsLoading(false);
      }
    };
    void getBalance();
  }, [token, walletAddress, contractService]);

  return { balance, isLoadingBalance: isLoading };
};

export default useTokenBalance;
