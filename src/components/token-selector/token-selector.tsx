"use client";
import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import { Network, Token } from "@/types/ethereum";
import { Address, formatUnits } from "viem";
import { tokenList } from "@/constants/tokenList";

interface TokenSelectorProps {
  value: Token;
  setValue: React.Dispatch<React.SetStateAction<Token>>;
  network: Network;
  balance?: bigint;
  isLoadingBalance?: boolean;
}

const TokenSelector = ({
  value,
  setValue,
  network,
  balance,
  isLoadingBalance,
}: TokenSelectorProps) => {
  const tokens = React.useMemo(
    () => Object.values(tokenList[network.chainId]),
    [network]
  );

  const handleChange = (address: Address) => {
    const selectedToken = tokens.find((token) => token.address === address);
    if (selectedToken) {
      setValue(selectedToken);
    }
  };

  return (
    <FormControl variant="outlined">
      <InputLabel id="token-selector-label">Token</InputLabel>
      <Select
        labelId="token-selector-label"
        id="token-selector"
        value={value.address}
        onChange={(e) => handleChange(e.target.value as Address)}
        label="Token"
      >
        {tokens.length > 0 ? (
          tokens.map((token) => (
            <MenuItem key={token.address} value={token.address}>
              {token.symbol}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="">
            There are no tokens allowed in this chain
          </MenuItem>
        )}
      </Select>
      <FormHelperText>
        {isLoadingBalance ? (
          <Skeleton variant="text" width={100} />
        ) : (
          `Balance: ${balance ? formatUnits(balance, value.decimals) : 0} ${
            value?.symbol
          }`
        )}
      </FormHelperText>
    </FormControl>
  );
};

export default TokenSelector;
