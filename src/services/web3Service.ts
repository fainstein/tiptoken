import { Config } from "wagmi";
import ContractService from "./contractService";
import { GetClientReturnType, getClient } from "@wagmi/core";
import ProviderService from "./providerService";
import SdkService from "./sdkService";
import WalletService from "./walletService";

export default class Web3Service {
  private sdkService: SdkService;

  private providerService: ProviderService;

  private contractService: ContractService;

  private walletService: WalletService;

  constructor() {
    // Initialize services
    this.sdkService = new SdkService();
    this.providerService = new ProviderService(this.sdkService);
    this.contractService = new ContractService(this.providerService);
    this.walletService = new WalletService(
      this.providerService,
      this.contractService
    );
  }

  getWalletService() {
    return this.walletService;
  }

  getContractService() {
    return this.contractService;
  }

  getProviderService() {
    return this.providerService;
  }
}
