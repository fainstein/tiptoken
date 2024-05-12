import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Network, NetworkList } from "@/types/ethereum";

interface NetworkSelectorProps {
  value: Network;
  onChange: (chainId: number) => void;
  allowedNetworks: NetworkList;
}

const NetworkSelector = ({
  value,
  onChange,
  allowedNetworks,
}: NetworkSelectorProps) => {
  return (
    <FormControl variant="outlined">
      <InputLabel id="network-selector-label">Network</InputLabel>
      <Select
        labelId="network-selector-label"
        id="network-selector"
        value={value.chainId}
        onChange={(e) => onChange(+e.target.value)}
        label="Network"
      >
        {Object.values(allowedNetworks).map((network) => (
          <MenuItem key={network.chainId} value={network.chainId}>
            {network.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default NetworkSelector;
