"use client";

import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import MultipleSelectToken from "./multiple-select-token";
import { NewCampaign } from "../types/campaign";
import { useAccount, useSignMessage } from "wagmi";
import { Token } from "../types/ethereum";
import { generateMessage } from "../utils/address";
import { CheckCircleOutline } from "@mui/icons-material";
import { ContainerBox } from "../ui/components/container-box";
import { useRouter } from "next/navigation";
import { NewUser, User } from "../types/user";

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
  const [endDate, setEndDate] = React.useState<DateTime | null>(null);
  const [goalUSD, setGoalUSD] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState("");
  const [user, setUser] = React.useState<{ id?: number; isNew?: boolean }>();
  const { signMessageAsync } = useSignMessage();
  const { address: owner } = useAccount();
  const router = useRouter();

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
    const campaignData = await handlePostCampaign({
      name,
      allowedTokens: selectedTokens,
      signature: signMessageData,
      endDate: endDate?.toSeconds(),
      goalUSD: +goalUSD > 0 ? +goalUSD : undefined,
      owner,
    });
    setSuccess(campaignData?.campaignId ?? "");
    setUser({
      isNew: !(campaignData && "name" in campaignData.creator),
      id: campaignData?.creator.user_id,
    });
    setIsLoading(false);
  };

  return (
    <>
      {success ? (
        <ContainerBox flexDirection="column" gap={4}>
          <CheckCircleOutline fontSize="large" />
          {user?.isNew && (
            <Button fullWidth onClick={() => router.push(`/user/${user.id}`)}>
              Tell contributors about yourself!
            </Button>
          )}
          <ContainerBox gap={2}>
            <Button
              variant="contained"
              onClick={() => router.push(`/campaign/${success}`)}
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
      )}
    </>
  );
};

export default CreateCampaignForm;
