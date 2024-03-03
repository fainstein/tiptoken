import { Config } from "wagmi";
import ContractService from "./contractService";
import { GetClientReturnType, getClient } from "@wagmi/core";
import ProviderService from "./providerService";
import SdkService from "./sdkService";

export default class Web3Service {
  sdkService: SdkService;

  providerService: ProviderService;

  contractService: ContractService;

  constructor() {
    // Initialize services
    this.sdkService = new SdkService();
    this.providerService = new ProviderService(this.sdkService);
    this.contractService = new ContractService(this.providerService);
  }
}
