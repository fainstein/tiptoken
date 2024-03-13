import { Box, Typography } from "@mui/material";
import CreateCampaignForm from "./create-campaign-form";
import { NewCampaign } from "../../types/campaign";
import { postCampaign } from "../api/campaign/postCampaign";
import { Address, verifyMessage } from "viem";

async function handlePostCampaign({
  signature,
  allowedChainIds,
  name,
  endDate,
  cafeCryptoUnit,
  goalCC,
  owner,
  description,
  message,
}: NewCampaign) {
  "use server";

  const verification = await verifyMessage({
    address: owner,
    message,
    signature,
  });

  if (!verification) {
    throw new Error("Message signed with another address");
  }

  try {
    const { campaign_id, creator } = await postCampaign({
      allowedChainIds,
      name,
      endDate,
      cafeCryptoUnit,
      goalCC,
      owner: owner.toLowerCase() as Address,
      description,
    });

    return { campaignId: campaign_id.toString(), creator };
  } catch (e) {
    console.error(e);
  }
}

export default function Create() {
  return (
    <Box display="flex" gap={12} flexDirection="column">
      <Typography variant="h3">Create campaign</Typography>
      <CreateCampaignForm handlePostCampaign={handlePostCampaign} />
    </Box>
  );
}
