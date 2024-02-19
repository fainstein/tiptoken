import React from "react";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { tokenList } from "../../constants/tokenList";
import { networkList } from "../../constants/networks";
import { Token } from "../../types/ethereum";

interface MultipleSelectTokenProps {
  selectedTokens: Token[];
  setSelectedTokens: React.Dispatch<React.SetStateAction<Token[]>>;
}

const MultipleSelectToken = ({
  selectedTokens,
  setSelectedTokens,
}: MultipleSelectTokenProps) => {
  const selectedNetwork = networkList.polygon.chainId;

  const handleChange = (event: SelectChangeEvent<typeof selectedTokens>) => {
    const selectedToken = event.target.value;
    if (typeof selectedToken === "string") {
      return;
    }

    setSelectedTokens(selectedToken);
  };

  const allowedTokens = React.useMemo(
    () => Object.values(tokenList[selectedNetwork]),
    [selectedNetwork]
  );

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="allowed-tokens">Allowed tokens</InputLabel>
      <Select
        multiple
        value={selectedTokens}
        placeholder="Select tokens"
        onChange={handleChange}
        labelId="allowed-tokens"
        variant="outlined"
        input={<OutlinedInput id="allowed-tokens" label="Allowed tokens" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((token) => (
              <Chip key={token.address} label={token.symbol} />
            ))}
          </Box>
        )}
      >
        {allowedTokens.map((token) => (
          <MenuItem
            key={`${token.chainId}-${token.address}`}
            value={token as any}
          >
            {token.symbol}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectToken;
