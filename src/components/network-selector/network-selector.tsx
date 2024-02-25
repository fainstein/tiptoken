import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Network } from "@/types/ethereum";
import { networkList } from "@/constants/networks";

interface NetworkSelectorProps {
  value: Network;
  setValue: React.Dispatch<React.SetStateAction<Network>>;
  onChange: (chainId: number) => void;
  allowedChains: number[];
}

const NetworkSelector = ({
  value,
  setValue,
  onChange,
  allowedChains,
}: NetworkSelectorProps) => {
  const handleChange = (chainId: string) => {
    const selectedChain = Object.values(networkList).find(
      (network) => network.chainId === +chainId
    );
    if (selectedChain) {
      setValue(selectedChain);
      onChange(selectedChain.chainId);
    }
  };

  const filteredChains = Object.values(networkList).filter((network) =>
    allowedChains.includes(network.chainId)
  );

  return (
    <FormControl variant="outlined">
      <InputLabel id="network-selector-label">Network</InputLabel>
      <Select
        labelId="network-selector-label"
        id="network-selector"
        value={value.chainId.toString()}
        onChange={(e) => handleChange(e.target.value)}
        label="Network"
      >
        {filteredChains.map((network) => (
          <MenuItem key={network.chainId} value={network.chainId}>
            {network.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default NetworkSelector;
