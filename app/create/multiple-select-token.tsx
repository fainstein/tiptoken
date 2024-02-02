import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface MultipleSelectTokenProps {
  selectedTokens: string[];
  setSelectedTokens: (updatedList: string[]) => void;
}

const allowedTokens = ["DAI", "USDT", "USDC"];

const MultipleSelectToken = ({
  selectedTokens,
  setSelectedTokens,
}: MultipleSelectTokenProps) => {
  const onSelectItem = (tokenName: string) => {
    const currentTokens = [...selectedTokens];
    var index = currentTokens.indexOf(tokenName);
    if (index === -1) {
      currentTokens.push(tokenName);
    } else {
      currentTokens.splice(index, 1);
    }

    setSelectedTokens(currentTokens);
  };

  const handleChange = (event: SelectChangeEvent<typeof selectedTokens>) => {
    const {
      target: { value },
    } = event;
    setSelectedTokens(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

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
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {allowedTokens.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectToken;
