"use client";

import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { StoredCampaign } from "@/types/campaign";
import NetworkSelector from "@/components/network-selector/network-selector";
import { Network, Token } from "@/types/ethereum";
import { networkList } from "@/constants/networks";
import TokenSelector from "@/components/token-selector/token-selector";
import Image from "next/image";
import CafeCrypto from "@/../public/CafeCrypto.png";

interface SupportCampaignFormProps {
  campaign: StoredCampaign;
}

const SupportCampaignForm = ({ campaign }: SupportCampaignFormProps) => {
  const [network, setNetwork] = React.useState<Network>(networkList["mainnet"]);
  const defaultToken = campaign.allowedTokens.find(
    (tokenItem) => tokenItem.chainId === network.chainId
  );
  const [token, setToken] = React.useState<Token | undefined>(defaultToken);
  const [ccAmount, setCcAmount] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleSupportCampaign = async () => {
    // setIsLoading(true);
    // await updateUser({ user_id: userId, name });
    // setSuccess(true);
    // setIsLoading(false);
  };

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={3}
      maxWidth="sm"
    >
      <NetworkSelector value={network} setValue={setNetwork} />
      <TokenSelector
        value={token}
        setValue={setToken}
        tokens={campaign.allowedTokens}
      />
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
          0.002 WETH ≈ ${+ccAmount * campaign.cafeCryptoUnit}
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
