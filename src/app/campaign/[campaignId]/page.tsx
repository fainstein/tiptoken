import { getCampaign } from "@/app/api/campaign/getCampaigns";

export default async function Campaign({
  params,
}: {
  params: { campaignId: string };
}) {
  const campaign = await getCampaign(Number(params.campaignId));
  return <div>{campaign.name}</div>;
}
