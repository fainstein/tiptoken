"use client";

import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import MultipleSelectToken from "./multiple-select-token";
import { NewCampaign } from "../types/campaign";
import { useAccount, useSignMessage } from "wagmi";
import { Token } from "../types/ethereum";
import { generateMessage } from "../utils/address";

interface CreateCampaignFormProps {
  handlePostCampaign: (campaign: NewCampaign) => Promise<void>;
}

const CreateCampaignForm = ({
  handlePostCampaign,
}: CreateCampaignFormProps) => {
  const [selectedTokens, setSelectedTokens] = React.useState<Token[]>([]);
  const [name, setName] = React.useState("");
  const [endDate, setEndDate] = React.useState<DateTime | null>(null);
  const [goalUSD, setGoalUSD] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const { signMessageAsync } = useSignMessage();
  const { address: owner } = useAccount();

  const handleCreateCampaign = async () => {
    if (!name || selectedTokens.length === 0 || !owner) {
      return;
    }

    const message = generateMessage();
    const signMessageData = await signMessageAsync({
      message,
      account: owner,
    });
    setIsLoading(true);
    await handlePostCampaign({
      name,
      allowedTokens: selectedTokens,
      signature: signMessageData,
      endDate: endDate?.toSeconds(),
      goalUSD: +goalUSD > 0 ? +goalUSD : undefined,
      owner,
    });
    setIsLoading(false);
  };

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={3}
      maxWidth="sm"
    >
      <TextField
        id="campaignName"
        placeholder="Campaign Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <MultipleSelectToken
        selectedTokens={selectedTokens}
        setSelectedTokens={setSelectedTokens}
      />
      <DatePicker
        label="End date"
        value={endDate}
        onChange={(newValue) => setEndDate(newValue)}
      />
      <OutlinedInput
        id="goalUSD"
        placeholder="Goal"
        inputProps={{ min: 1, step: 1 }}
        endAdornment={<InputAdornment position="end">USD</InputAdornment>}
        type="number"
        value={goalUSD}
        onChange={(e) => setGoalUSD(e.target.value)}
      />
      <Button
        variant="contained"
        size="large"
        onClick={handleCreateCampaign}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress /> : "Create"}
      </Button>
    </Box>
  );
};

export default CreateCampaignForm;
