"use client";

import {
  Box,
  Button,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import MultipleSelectToken from "./multiple-select-token";
import React from "react";

const CreateCampaignForm = () => {
  const [selectedTokens, setSelectedTokens] = React.useState<string[]>([]);

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={3}
      maxWidth="sm"
    >
      <TextField id="campaignName" placeholder="Campaign Name" />
      <MultipleSelectToken
        selectedTokens={selectedTokens}
        setSelectedTokens={(updatedList) => setSelectedTokens(updatedList)}
      />
      <DatePicker label="End date" />
      <OutlinedInput
        id="goalUSD"
        placeholder="Goal"
        inputProps={{ min: 1, step: 1 }}
        endAdornment={<InputAdornment position="end">USD</InputAdornment>}
        type="number"
      />
      <Button variant="contained" size="large">
        Create
      </Button>
    </Box>
  );
};

export default CreateCampaignForm;
