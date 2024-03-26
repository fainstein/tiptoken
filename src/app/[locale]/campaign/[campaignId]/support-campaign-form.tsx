"use client";

import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { StoredCampaign } from "@/types/campaign";
import NetworkSelector from "@/components/network-selector/network-selector";
import { Network, Token, TokenAddress, TokenPrices } from "@/types/ethereum";
import TokenSelector from "@/components/token-selector/token-selector";
import Image from "next/image";
import CafeCrypto from "@/../public/CafeCrypto.png";
import { useAccount, useWalletClient } from "wagmi";
import useTokenBalance from "@/hooks/useTokenBalance";
import { useSnackbar } from "notistack";
import usewalletService from "@/hooks/services/useWalletService";
import { maxUint256, maxUint72, parseUnits } from "viem";
import { PostcampaignTransaction } from "@/types/transactions";
import { tokenList } from "@/constants/tokenList";
import { useRouter } from "next/navigation";
import { useScopedI18n } from "@/locales/client";

const amountRegex = RegExp(/^[1-9]\d*$/);

interface SupportCampaignFormProps {
  campaign: StoredCampaign;
  handleGetTokensPrices: ({
    networkName,
    tokens,
  }: {
    networkName: string;
    tokens: TokenAddress[];
  }) => Promise<TokenPrices | undefined>;
  handlePostCampaignTransaction: (
    campaignTransactionData: PostcampaignTransaction
  ) => Promise<void>;
  allowedNetworks: Network[];
  defaultNetwork: Network;
  defaultToken: Token;
}

const SupportCampaignForm = ({
  campaign,
  handleGetTokensPrices,
  allowedNetworks,
  defaultNetwork,
  defaultToken,
  handlePostCampaignTransaction,
}: SupportCampaignFormProps) => {
  const [network, setNetwork] = React.useState<Network>(defaultNetwork);
  const [token, setToken] = React.useState<Token>(defaultToken);
  const [ccAmount, setCcAmount] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [tokenPrices, setTokenPrices] = React.useState<TokenPrices>();
  const [isLoadingPrices, setIsLoadingPrices] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const account = useAccount();
  const walletClient = useWalletClient();
  const walletService = usewalletService();
  const snackbar = useSnackbar();
  const router = useRouter();

  React.useEffect(() => {
    const tokenAddresses = Object.values(tokenList[network.chainId]).map(
      (token) => token.address
    );
    const getData = async () => {
      setIsLoadingPrices(true);
      const prices = await handleGetTokensPrices({
        networkName: network.name,
        tokens: tokenAddresses,
      });
      setTokenPrices(prices);
      setIsLoadingPrices(false);
    };
    void getData();
  }, [network, handleGetTokensPrices]);
  const { balance = 0n, isLoadingBalance } = useTokenBalance({
    token,
    walletAddress: account.address,
  });
  const t = useScopedI18n("support.campaign");

  const ccUsdValue = Number(ccAmount || 0) * campaign.cafeCryptoUnit;
  const tokenValue =
    token && tokenPrices && tokenPrices[token.address]
      ? ccUsdValue / tokenPrices[token.address]
      : undefined;

  const parsedAmount = parseUnits(
    tokenValue?.toString() || "0",
    token.decimals
  );

  const handleNetworkChange = React.useCallback(
    (chainId: number) => {
      const newNetwork = allowedNetworks.find(
        (network) => network.chainId === chainId
      );

      if (newNetwork) {
        const newDefaultToken = Object.values(tokenList[chainId])[0];
        setToken(newDefaultToken);
        setNetwork(newNetwork);
      }
    },
    [allowedNetworks]
  );

  const handleAmountChange = (newAmount: string) => {
    if (!newAmount) {
      setCcAmount("");
    }

    if (
      Number(newAmount) > Number(maxUint72) ||
      Number(newAmount || 0) * campaign.cafeCryptoUnit > Number(maxUint72)
    ) {
      return;
    }

    const santizedAmount = newAmount.replace(/,/g, ".");
    if (
      amountRegex.test(santizedAmount.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    ) {
      setCcAmount(santizedAmount);
    }
  };

  const btnState = React.useMemo<{
    disabled: boolean;
    title: string;
    onClick?: () => Promise<void>;
  }>(() => {
    if (!account.address) {
      return { disabled: true, title: "Connect wallet" };
    } else if (parsedAmount > balance) {
      return { disabled: true, title: "Not enough balance" };
    } else if (walletClient.data?.chain.id !== network.chainId) {
      return {
        disabled: false,
        title: `Switch network to ${network.name}`,
        onClick: () => walletService.attemptToChangeNetwork(network.chainId),
      };
    } else if (!parsedAmount) {
      return { disabled: true, title: "Send" };
    }

    return { disabled: false, title: "Send" };
  }, [
    account.address,
    parsedAmount,
    balance,
    walletClient.data?.chain.id,
    network.chainId,
    network.name,
    walletService,
  ]);

  const handleSupportCampaign = async () => {
    setIsLoading(true);

    if (!account.address || parsedAmount > balance) {
      return;
    }
    try {
      const txData = await walletService.transferToken({
        from: account.address,
        to: campaign.owner,
        amount: parsedAmount,
        signer: walletClient,
        token,
      });

      if (!txData) {
        throw new Error("There was an issue while creating your transaction");
      }

      const parsedTransactionDbData: PostcampaignTransaction = {
        campaignId: campaign.campaignId,
        ccAmount: +ccAmount,
        chainId: token.chainId,
        hash: txData.hash,
        senderAddress: account.address,
        tokenAddress: token.address,
        tokenAmount: parsedAmount,
        senderMessage: message,
      };

      snackbar.enqueueSnackbar({
        variant: "success",
        message: "Transaction submited",
      });

      await handlePostCampaignTransaction(parsedTransactionDbData);
      router.refresh();
    } catch (e) {
      console.error(e);
      snackbar.enqueueSnackbar({
        variant: "error",
        message: (e as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" display="flex" flexDirection="column" gap={3}>
      <Typography variant="h5">{t("contribute")}</Typography>
      <NetworkSelector
        value={network}
        onChange={handleNetworkChange}
        allowedNetworks={allowedNetworks}
      />
      <TokenSelector
        value={token}
        setValue={setToken}
        network={network}
        balance={balance}
        isLoadingBalance={isLoadingBalance}
      />
      <FormControl variant="outlined">
        <OutlinedInput
          id="cc-amount"
          placeholder="☕ to send"
          endAdornment={
            <InputAdornment position="end">
              <Image
                alt="cafe-crypto-unit"
                src={CafeCrypto}
                width={24}
                height={24}
              />
            </InputAdornment>
          }
          value={ccAmount}
          onChange={(e) => handleAmountChange(e.target.value)}
        />
        <FormHelperText>
          {isLoadingPrices ? (
            <Skeleton variant="text" width={100} />
          ) : token ? (
            `${parseFloat(tokenValue?.toFixed(3) || "0")} ${
              token.symbol
            } ≈ $${ccUsdValue.toFixed(2)}`
          ) : (
            "-"
          )}
        </FormHelperText>
      </FormControl>
      <TextField
        id="multiline-message"
        label="Message (optional)"
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        variant="contained"
        size="large"
        onClick={btnState.onClick ?? handleSupportCampaign}
        disabled={isLoading || btnState.disabled}
      >
        {isLoading ? <CircularProgress /> : btnState.title}
      </Button>
      <Typography variant="body1" textAlign="center">
        Sending {tokenValue ? `${tokenValue.toFixed(2)} ${token.symbol}` : ""}{" "}
        to {campaign.owner}
      </Typography>
    </Box>
  );
};

export default SupportCampaignForm;
