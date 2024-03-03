import { getContract } from "viem";
import erc20Abi from "@/ethereum/abis/erc20";
import ProviderService from "./providerService";
import { Token } from "@/types/ethereum";

export default class ContractService {
  providerService: ProviderService;

  constructor(providerService: ProviderService) {
    this.providerService = providerService;
  }

  getErc20Contract(token: Token) {
    const publicClient = this.providerService.getPublicClient(token.chainId);
    return getContract({
      abi: erc20Abi,
      address: token.address,
      client: publicClient,
    });
  }
}
