import { Token, TokenType } from "@/types/ethereum";
import {
  Address,
  PrepareTransactionRequestParameters,
  encodeFunctionData,
} from "viem";
import ProviderService from "./providerService";
import ContractService from "./contractService";
import { Connector, UseWalletClientReturnType } from "wagmi";
import { getConnections, getWalletClient, switchChain } from "wagmi/actions";
import { config } from "@/ethereum/wagmi/config";
import { DateTime } from "luxon";

export default class WalletService {
  providerService: ProviderService;

  contractService: ContractService;

  constructor(
    providerService: ProviderService,
    contractService: ContractService
  ) {
    this.providerService = providerService;
    this.contractService = contractService;
  }

  private async getTransferTokenTx({
    from,
    to,
    token,
    amount,
    signer,
  }: {
    from: Address;
    to: Address;
    token: Token;
    amount: bigint;
    signer: UseWalletClientReturnType;
  }) {
    if (amount <= 0) {
      throw new Error("Amount must be greater than zero");
    }
    let txData: PrepareTransactionRequestParameters = { chain: null };

    if (token.type === TokenType.ERC20) {
      const erc20Contract = this.contractService.getERC20TokenInstance(
        token,
        signer
      );

      const data = encodeFunctionData({
        ...erc20Contract,
        functionName: "transfer",
        args: [to, amount],
      });

      txData = {
        to: erc20Contract.address,
        data,
        account: from,
        chain: null,
      };
    } else if (token.type === TokenType.NATIVE) {
      txData = {
        account: from,
        to,
        value: amount,
        chain: null,
      };
    }
    try {
      const preparedTx = await signer.data?.prepareTransactionRequest(txData);

      return preparedTx;
    } catch (e) {
      throw new Error("There was an error getting the transaction data");
    }
  }

  async transferToken({
    from,
    to,
    token,
    amount,
    signer,
  }: {
    from: Address;
    to: Address;
    token: Token;
    amount: bigint;
    signer: UseWalletClientReturnType;
  }): Promise<
    | {
        hash: Address;
      }
    | undefined
  > {
    const txToSend = await this.getTransferTokenTx({
      from,
      to,
      token,
      amount,
      signer,
    });

    if (!txToSend) {
      throw new Error("There was an issue while creating your transaction");
    }

    const hash = await signer.data?.sendTransaction({
      ...txToSend,
      account: from,
      chain: null,
    });

    if (!hash) {
      throw new Error("There was an issue while creating your transaction");
    }

    return {
      hash,
    };
  }

  async getWalletVerifyingSignature() {
    const walletClient = await getWalletClient(config);
    const message = `Please verify ownership for this account:\r\n${
      walletClient.account.address
    }.\r\n\r\nIssued at: ${DateTime.now()}`;

    try {
      const signature = await walletClient.signMessage({ message });
      return { signature, message };
    } catch (e) {
      console.error(e);
      throw new Error(
        "There was an error getting your signature. Please try again"
      );
    }
  }

  async attemptToChangeNetwork(chainId: number) {
    const connections = getConnections(config);
    await switchChain(config, {
      chainId: chainId as any,
      connector: connections[0]?.connector,
    });
  }
}
