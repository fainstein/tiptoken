import { Link } from "@mui/material";
import NextLink from "next/link";
import { getCampaigns } from "./api/campaign/getCampaigns";

export default async function Home() {
  const campaigns = await getCampaigns();

  return (
    <div>
      {campaigns.map((campaign) => (
        <Link
          href={`/campaign/${campaign.campaign_id}`}
          variant="h4"
          component={NextLink}
          key={campaign.campaign_id}
        >
          {campaign.name}
        </Link>
      ))}
    </div>
  );
}
