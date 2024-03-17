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
import { tokenList } from "../../../constants/tokenList";
import { networkList } from "../../../constants/networks";

interface MultipleSelectTokenProps {
  selectedChains: string[];
  setSelectedChains: React.Dispatch<React.SetStateAction<string[]>>;
}

const MultipleSelectToken = ({
  selectedChains,
  setSelectedChains,
}: MultipleSelectTokenProps) => {
  const handleChange = (event: SelectChangeEvent<typeof selectedChains>) => {
    const selectedChain = event.target.value;
    if (typeof selectedChain === "string") {
      return;
    }

    setSelectedChains(selectedChain);
  };

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="allowed-networks">Allowed networks</InputLabel>
      <Select
        multiple
        value={selectedChains}
        placeholder="Select chains"
        onChange={handleChange}
        labelId="allowed-networks"
        variant="outlined"
        input={<OutlinedInput id="allowed-networks" label="Allowed networks" />}
        renderValue={(selected) => (
          <Box
            display="flex"
            gap={0.5}
            flexWrap="wrap"
          >
            {selected.map((chainId) => (
              <Chip key={chainId} label={networkList[+chainId].name} />
            ))}
          </Box>
        )}
      >
        {Object.values(networkList).map((chain) => (
          <MenuItem key={chain.chainId} value={chain.chainId.toString()}>
            {chain.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectToken;
