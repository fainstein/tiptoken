import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Token } from "@/types/ethereum";
import { Address } from "viem";

interface TokenSelectorProps {
  value?: Token;
  setValue: React.Dispatch<React.SetStateAction<Token | undefined>>;
  tokens: Token[];
}

const TokenSelector = ({ value, setValue, tokens }: TokenSelectorProps) => {
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
        value={value?.address || ""}
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
    </FormControl>
  );
};

export default TokenSelector;
