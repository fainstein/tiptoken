import { getCampaign } from "@/app/actions/campaign/getCampaigns";
import SupportCampaignForm from "./support-campaign-form";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { NetworkList, TokenAddress } from "@/types/ethereum";
import { getTokenPrices } from "@/app/actions/defillama/getTokenPrices";
import { networkList } from "@/constants/networks";
import { redirect } from "next/navigation";
import { postCampaignTransaction } from "@/app/actions/transactions/postCampaignTransaction";
import { PostcampaignTransaction } from "@/types/transactions";
import { tokenList } from "@/constants/tokenList";
import TransactionsList from "./transactions-list";
import { Suspense } from "react";

const handleGetTokensPrices = async ({
  networkName,
  tokens,
}: {
  networkName: string;
  tokens: TokenAddress[];
}) => {
  "use server";
  try {
    return await getTokenPrices({ networkName, tokens });
  } catch (e) {
    console.error(e);
  }
};

const handlePostCampaignTransaction = async (
  campaignTransactionData: PostcampaignTransaction
) => {
  "use server";

  await postCampaignTransaction(campaignTransactionData);
};

export default async function Campaign({
  params,
}: {
  params: { campaignId: string };
}) {
  const campaign = await getCampaign(Number(params.campaignId));

  if (!campaign) {
    redirect("/");
  }

  const allowedNetworks = Object.values(networkList).filter((network) =>
    campaign.allowedChainIds.includes(network.chainId)
  );
  const defaultNetwork = allowedNetworks[0];
  const defaultToken = Object.values(tokenList[defaultNetwork.chainId])[0];

  return (
    <Box display="flex" gap={12} flexDirection="column">
      <Typography variant="h4">{campaign.name}</Typography>
      <Grid container rowSpacing={10} justifyContent="center">
        <Grid item xs={12} sm={8}>
          <SupportCampaignForm
            campaign={campaign}
            handleGetTokensPrices={handleGetTokensPrices}
            handlePostCampaignTransaction={handlePostCampaignTransaction}
            allowedNetworks={allowedNetworks}
            defaultNetwork={defaultNetwork}
            defaultToken={defaultToken}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Suspense fallback={<CircularProgress />}>
            <TransactionsList
              campaignId={campaign.campaignId}
              ccUnit={campaign.cafeCryptoUnit}
            />
          </Suspense>
        </Grid>
      </Grid>
    </Box>
  );
}
