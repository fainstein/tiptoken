import { getContract } from "viem";
import erc20Abi from "@/ethereum/abis/erc20";
import ProviderService from "./providerService";
import { Token } from "@/types/ethereum";
import { UseWalletClientReturnType } from "wagmi";

export default class ContractService {
  providerService: ProviderService;

  constructor(providerService: ProviderService) {
    this.providerService = providerService;
  }

  getERC20TokenInstance(token: Token, signer?: UseWalletClientReturnType) {
    const publicClient = this.providerService.getPublicClient(token.chainId);
    return getContract({
      abi: erc20Abi,
      address: token.address,
      client: signer?.data || publicClient,
    });
  }
}
