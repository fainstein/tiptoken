import { Chain, PublicClient, createPublicClient, http } from "viem";
import SdkService from "./sdkService";

export default class ProviderService {
  sdkService: SdkService;

  constructor(sdkService: SdkService) {
    this.sdkService = sdkService;
  }

  getPublicClient(chainId: number) {
    return this.sdkService.sdk.providerService.getViemPublicClient({
      chainId,
    }) as unknown as PublicClient;
  }
}
