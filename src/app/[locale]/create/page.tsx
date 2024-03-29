import { Box, Typography } from "@mui/material";
import CreateCampaignForm from "./create-campaign-form";
import { NewCampaign } from "../../../types/campaign";
import { postCampaign } from "../../actions/campaign/postCampaign";
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
    throw new Error(
      "Uh oh! Your signature doesn't match with your wallet. Please try again"
    );
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
    throw new Error(
      "We were not able to create your campaign. Please try again"
    );
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
