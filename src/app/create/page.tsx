import { Box, Typography } from "@mui/material";
import CreateCampaignForm from "./create-campaign-form";
import { NewCampaign } from "../../types/campaign";
import { postCampaign } from "../api/campaign/postCampaign";
import { recoverMessageAddress, verifyMessage } from "viem";
import { generateMessage } from "../../utils/address";
// HELLO
async function handlePostCampaign({
  signature,
  allowedTokens,
  name,
  endDate,
  goalUSD,
  owner,
}: NewCampaign) {
  "use server";
  const message = generateMessage();
  const recoveredAddress = await recoverMessageAddress({
    signature,
    message,
  });

  const verification = await verifyMessage({
    address: owner,
    message,
    signature,
  });

  if (!verification) {
    throw new Error("Message signed with another address");
  }

  const allowedTokenKeys = allowedTokens.map(
    (token) => `${token.chainId}-${token.address}`
  );
  try {
    const { campaign_id, creator } = await postCampaign({
      allowedTokens: allowedTokenKeys,
      name: name,
      endDate: endDate,
      goalUSD: goalUSD,
      owner: recoveredAddress.toLowerCase() as typeof recoveredAddress,
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
