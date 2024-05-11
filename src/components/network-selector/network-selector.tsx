import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
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
  // const [selectedChainId, setSelectedChainId] = useState(value.chainId);

  // const handleSelectChange = (e: SelectChangeEvent<number>) => {
  //   const newChainId = +e.target.value;
  //   setSelectedChainId(newChainId);
  //   onChange(newChainId);
  // };

  return (
    <FormControl variant="outlined">
      <InputLabel id="network-selector-label">Network</InputLabel>
      <Select
        labelId="network-selector-label"
        id="network-selector"
        value={value.chainId}
        onChange={(e) => onChange(+e.target.value)} //selectedChainId === network.chainId &&
        // onClick={}
        label="Network"
      >
        {Object.values(allowedNetworks).map((network) => (
          <MenuItem
            key={network.chainId}
            value={network.chainId}
            // selected={selectedChainId === network.chainId}
          >
            {network.name + "✓"}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default NetworkSelector;

// selected={selectedChainId === network.chainId}
// onClick={() => setSelectedChainId(network.chainId)}

//             {selectedChainId === network.chainId && (
//  <span style={{ marginLeft: "5px" }}>✓</span>)}
