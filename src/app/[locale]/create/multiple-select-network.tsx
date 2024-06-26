"use client";

import * as React from "react";
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
  ListItemText,
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
        labelId="allowed-networks"
        id="allowed-networks"
        multiple
        value={selectedChains}
        onChange={handleChange}
        variant="outlined"
        input={<OutlinedInput label={t("network")} />}
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
            <Checkbox
              checked={selectedChains.indexOf(chain.chainId.toString()) > -1}
            />
            <ListItemText primary={`${chain.name}`} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectNetwork;
