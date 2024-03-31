import { Box, Typography } from "@mui/material";
import CreateCampaignForm from "./create-campaign-form";
import { NewCampaign } from "../../../types/campaign";
import { postCampaign } from "../../actions/campaign/postCampaign";
import { Address, verifyMessage } from "viem";
import { getI18n } from "@/locales/server";
import { redirect } from "next/navigation";

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
    const campaign_id = await postCampaign({
      allowedChainIds,
      name,
      endDate,
      cafeCryptoUnit,
      goalCC,
      owner: owner.toLowerCase() as Address,
      description,
    });
    return campaign_id;
  } catch (e) {
    console.error(e);
    throw new Error(
      "We were not able to create your campaign. Please try again"
    );
  }
}

export default async function Create() {
  const t = await getI18n();
  return (
    <Box display="flex" gap={12} flexDirection="column" alignItems="center">
      <Typography variant="h4">{t("create.title")}</Typography>
      <CreateCampaignForm handlePostCampaign={handlePostCampaign} />
    </Box>
  );
}
