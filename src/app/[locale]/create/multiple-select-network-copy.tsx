/* "use client";

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
  Checkbox,
} from "@mui/material";
import { networkList } from "../../../constants/networks";
import { useScopedI18n } from "@/locales/client";

interface MultipleSelectNetworkProps {
  selectedChains: string[];
  setSelectedChains: React.Dispatch<React.SetStateAction<string[]>>;
  disabled?: boolean;
}

const MultipleSelectNetwork = ({
  selectedChains,
  setSelectedChains,
  disabled,
}: MultipleSelectNetworkProps) => {
  const t = useScopedI18n("create.form");
  const handleChange = (event: SelectChangeEvent<typeof selectedChains>) => {
    const selectedChain = event.target.value; 
    if (typeof selectedChain === "string") {
      return;
    }
    setSelectedChains(selectedChain);
  };

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="allowed-networks">{t("network")}</InputLabel>
      <Select
        multiple
        value={selectedChains}
        onChange={handleChange}
        labelId="allowed-networks"
        variant="outlined"
        input={<OutlinedInput id="allowed-networks" label={t("network")} />}
        renderValue={(selected) => (
          <Box display="flex" gap={0.5} flexWrap="wrap">
            {selected.map((chainId) => (
              <Chip key={chainId} label={networkList[+chainId].name} />
            ))}
          </Box>
        )}
        disabled={disabled}
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

export default MultipleSelectNetwork;

/** <Checkbox
value={selectedChains}
onChange={handleChange}
inputProps={{ "aria-label": "controlled" }}
defaultChecked
size="small"
/>
 */
