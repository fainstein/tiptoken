import { buildSDK } from "@mean-finance/sdk";

export default class SdkService {
  sdk: ReturnType<typeof buildSDK<object>>;

  constructor() {
    this.sdk = buildSDK();
  }
}
