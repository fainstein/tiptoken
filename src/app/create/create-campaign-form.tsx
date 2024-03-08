"use client";

import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import MultipleSelectToken from "./multiple-select-token";
import { NewCampaign } from "../../types/campaign";
import { useAccount, useSignMessage } from "wagmi";
import { Token } from "../../types/ethereum";
import { generateMessage } from "../../utils/address";
import { CheckCircleOutline } from "@mui/icons-material";
import { ContainerBox } from "../../ui/components/container-box";
import { NewUser, User } from "../../types/user";
import Link from "next/link";

interface CreateCampaignFormProps {
  handlePostCampaign: (
    campaign: NewCampaign
  ) => Promise<{ campaignId: string; creator: User | NewUser } | undefined>;
}

const CreateCampaignForm = ({
  handlePostCampaign,
}: CreateCampaignFormProps) => {
  const [selectedTokens, setSelectedTokens] = React.useState<Token[]>([]);
  const [name, setName] = React.useState("");
  const [goalCC, setGoalCC] = React.useState("");
  const [CCValue, setCCValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState("");
  const [user, setUser] = React.useState<{ id?: number; isNew?: boolean }>();
  const [description, setDescription] = React.useState("");
  const { signMessageAsync } = useSignMessage();
  const { address: owner } = useAccount();

  const handleCreateCampaign = async () => {
    if (!name || selectedTokens.length === 0 || !owner || !+CCValue) {
      return;
    }

    const message = generateMessage();
    const signMessageData = await signMessageAsync({
      message,
      account: owner,
    });
    setIsLoading(true);
    const campaignData = await handlePostCampaign({
      name,
      allowedTokens: selectedTokens,
      signature: signMessageData,
      cafeCryptoUnit: +CCValue,
      goalCC: +goalCC > 0 ? +goalCC : null,
      owner,
      description,
      endDate: null
    });
    setSuccess(campaignData?.campaignId ?? "");
    setUser({
      isNew: !(campaignData && "name" in campaignData.creator),
      id: campaignData?.creator.user_id,
    });
    setIsLoading(false);
  };

  const handleCcValueChange = (newValue: string) => {
    const inputRegex = RegExp(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/);
    if (inputRegex.test(newValue) || newValue === "") {
      setCCValue(newValue);
    }
  };

  return (
    <>
      {success ? (
        <ContainerBox flexDirection="column" gap={4}>
          <CheckCircleOutline fontSize="large" />
          {user?.isNew && (
            <Button
              variant="contained"
              LinkComponent={Link}
              href={`/user/${user.id}`}
            >
              Tell contributors about yourself!
            </Button>
          )}
          <ContainerBox gap={2}>
            <Button
              variant="contained"
              LinkComponent={Link}
              href={`/campaign/${success}`}
            >
              View Campaign
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setSuccess("")}
            >
              Create
            </Button>
          </ContainerBox>
        </ContainerBox>
      ) : (
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
          <FormControl variant="outlined">
            <OutlinedInput
              id="CCValue"
              placeholder="☕ value"
              inputProps={{ min: 1, step: 1 }}
              endAdornment={<InputAdornment position="end">USD</InputAdornment>}
              value={CCValue}
              onChange={(e) => handleCcValueChange(e.target.value)}
            />
            <FormHelperText>
              This is the minimum amount you will receive for each donation
            </FormHelperText>
          </FormControl>
          <FormControl variant="outlined">
            <OutlinedInput
              id="goalCC"
              placeholder="Goal"
              inputProps={{ min: 1, step: 1 }}
              endAdornment={<InputAdornment position="end">☕</InputAdornment>}
              value={goalCC}
              onChange={(e) => setGoalCC(e.target.value.replace(/[^0-9]/g, ""))}
            />
            {goalCC && (
              <FormHelperText>
                Your goal: {+goalCC * +CCValue} USD
              </FormHelperText>
            )}
          </FormControl>
          <TextField
            id="multiline-message"
            label="Description (optional)"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
      )}
    </>
  );
};

export default CreateCampaignForm;
