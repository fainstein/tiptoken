import { getCampaign } from "@/src/app/api/getCampaigns";
import { Link } from "@mui/material";
import NextLink from "next/link";

export default async function Campaign({
  params,
}: {
  params: { campaignId: string };
}) {
  const campaign = await getCampaign(Number(params.campaignId));
  return <div>{campaign.name}</div>;
}
