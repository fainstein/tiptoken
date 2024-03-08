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
import {
  Network,
  NetworkList,
  Token,
  TokenAddress,
  TokenPrices,
} from "@/types/ethereum";
import TokenSelector from "@/components/token-selector/token-selector";
import Image from "next/image";
import CafeCrypto from "@/../public/CafeCrypto.png";
import { useAccount, useWalletClient } from "wagmi";
import useTokenBalance from "@/hooks/useTokenBalance";
import { useSnackbar } from "notistack";
import usewalletService from "@/hooks/services/useWalletService";
import { parseUnits } from "viem";
import { PostcampaignTransaction } from "@/types/transactions";

const amountRegex = RegExp(/^[1-9]\d*$/);

interface SupportCampaignFormProps {
  campaign: StoredCampaign;
  handleGetTokensPrices: ({
    networkName,
    tokens,
  }: {
    networkName: string;
    tokens: TokenAddress[];
  }) => Promise<TokenPrices>;
  handlePostCampaignTransaction: (
    campaignTransactionData: PostcampaignTransaction
  ) => Promise<void>;
  allowedNetworks: NetworkList;
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

  const allowedTokens = React.useMemo(
    () =>
      campaign.allowedTokens.filter(
        (token) => token.chainId === network.chainId
      ),
    [network, campaign]
  );

  React.useEffect(() => {
    const tokenAddresses = allowedTokens.map((token) => token.address);
    const getData = async () => {
      setIsLoadingPrices(true);
      const prices = await handleGetTokensPrices({
        networkName: network.name,
        tokens: tokenAddresses,
      });
      setTokenPrices(prices);
      setIsLoadingPrices(false);
    };
    getData();
  }, [network, allowedTokens, handleGetTokensPrices]);

  const { balance, isLoadingBalance } = useTokenBalance({
    token,
    walletAddress: account.address,
  });

  const ccUsdValue = +ccAmount * campaign.cafeCryptoUnit;
  const tokenValue =
    token && tokenPrices && tokenPrices[token.address]
      ? ccUsdValue / tokenPrices[token.address]
      : undefined;

  const handleNetworkChange = React.useCallback(
    (chainId: number) => {
      const newDefaultToken = campaign.allowedTokens.find(
        (tokenItem) => tokenItem.chainId === chainId
      );

      if (newDefaultToken && allowedNetworks[chainId]) {
        setToken(newDefaultToken);
        setNetwork(allowedNetworks[chainId]);
      }
    },
    [campaign, allowedNetworks]
  );

  const handleAmountChange = (newAmount: string) => {
    if (!newAmount) {
      setCcAmount("");
    }

    const parsedAmount = newAmount.replace(/,/g, ".");
    if (amountRegex.test(parsedAmount.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))) {
      setCcAmount(parsedAmount);
    }
  };

  const handleSupportCampaign = async () => {
    setIsLoading(true);
    const parsedAmount = parseUnits(
      tokenValue?.toString() || "0",
      token.decimals
    );

    if (!account.address || !balance || parsedAmount > balance) {
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

      void handlePostCampaignTransaction(parsedTransactionDbData);

      snackbar.enqueueSnackbar({
        variant: "success",
        message: "Transaction submited",
      });
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        snackbar.enqueueSnackbar({
          variant: "error",
          message: e.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={3}
      maxWidth="sm"
    >
      <Typography variant="body1">Sending to {campaign.owner}</Typography>
      <NetworkSelector
        value={network}
        onChange={handleNetworkChange}
        allowedNetworks={allowedNetworks}
      />
      <TokenSelector
        value={token}
        setValue={setToken}
        tokens={allowedTokens}
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
        onClick={handleSupportCampaign}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress /> : "Send"}
      </Button>
    </Box>
  );
};

export default SupportCampaignForm;
