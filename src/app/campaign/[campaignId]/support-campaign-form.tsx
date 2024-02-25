"use client";

import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  Skeleton,
  TextField,
} from "@mui/material";
import { StoredCampaign } from "@/types/campaign";
import NetworkSelector from "@/components/network-selector/network-selector";
import { Network, Token, TokenAddress, TokenPrices } from "@/types/ethereum";
import { networkList } from "@/constants/networks";
import TokenSelector from "@/components/token-selector/token-selector";
import Image from "next/image";
import CafeCrypto from "@/../public/CafeCrypto.png";

interface SupportCampaignFormProps {
  campaign: StoredCampaign;
  handleGetTokensPrices: ({
    networkName,
    tokens,
  }: {
    networkName: string;
    tokens: TokenAddress[];
  }) => Promise<TokenPrices>;
}

const SupportCampaignForm = ({
  campaign,
  handleGetTokensPrices,
}: SupportCampaignFormProps) => {
  const [network, setNetwork] = React.useState<Network>(networkList["polygon"]);

  const getDefaultToken = React.useCallback(
    (chainId: number) =>
      campaign.allowedTokens.find((tokenItem) => tokenItem.chainId === chainId),
    [campaign]
  );

  const [token, setToken] = React.useState<Token | undefined>(
    getDefaultToken(network.chainId)
  );
  const [ccAmount, setCcAmount] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [tokenPrices, setTokenPrices] = React.useState<TokenPrices>();
  const [isLoadingPrices, setIsLoadingPrices] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleNetworkChange = (chainId: number) => {
    const newDefaultToken = getDefaultToken(chainId);
    setToken(newDefaultToken);
  };

  const handleSupportCampaign = async () => {
    // setIsLoading(true);
    // await updateUser({ user_id: userId, name });
    // setSuccess(true);
    // setIsLoading(false);
  };

  const allowedTokens = React.useMemo(
    () =>
      campaign.allowedTokens.filter(
        (token) => token.chainId === network.chainId
      ),
    [network, campaign]
  );

  const allowedChains = React.useMemo(() => {
    const uniqueChainIdsSet = new Set(
      campaign.allowedTokens.map((token) => token.chainId)
    );

    return [...uniqueChainIdsSet];
  }, [campaign]);

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
  }, [network]);

  const ccUsdValue = +ccAmount * campaign.cafeCryptoUnit;
  const tokenValue =
    token && tokenPrices && tokenPrices[token.address]
      ? ccUsdValue / tokenPrices[token.address]
      : undefined;

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={3}
      maxWidth="sm"
    >
      <NetworkSelector
        value={network}
        setValue={setNetwork}
        onChange={handleNetworkChange}
        allowedChains={allowedChains}
      />
      <TokenSelector value={token} setValue={setToken} tokens={allowedTokens} />
      <FormControl variant="outlined">
        <OutlinedInput
          id="cc-amount"
          placeholder="☕ to send"
          inputProps={{ min: 1, step: 1 }}
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
          type="number"
          value={ccAmount}
          onChange={(e) => setCcAmount(e.target.value)}
        />
        <FormHelperText>
          {isLoadingPrices ? (
            <Skeleton variant="text" width={100} />
          ) : (
            token &&
            tokenValue &&
            `${parseFloat(tokenValue.toFixed(3))} ${
              token.symbol
            } ≈ $${ccUsdValue.toFixed(2)}`
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
        Send
      </Button>
    </Box>
  );
};

export default SupportCampaignForm;
