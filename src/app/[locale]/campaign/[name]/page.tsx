import { getCampaignByName } from "@/app/actions/campaign/getCampaigns";
import SupportCampaignForm from "./support-campaign-form";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { TokenAddress } from "@/types/ethereum";
import { getTokenPrices } from "@/app/actions/defillama/getTokenPrices";
import { networkList } from "@/constants/networks";
import { postCampaignTransaction } from "@/app/actions/transactions/postCampaignTransaction";
import { PostcampaignTransaction } from "@/types/transactions";
import { tokenList } from "@/constants/tokenList";
import TransactionsList from "./transactions-list";
import { Suspense } from "react";
import { Share } from "@mui/icons-material";
import ShareButton from "@/ui/components/share-btn";

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
  params: { name: string };
}) {
  const campaign = await getCampaignByName(params.name);

  const allowedNetworks = Object.values(networkList).filter((network) =>
    campaign.allowedChainIds.includes(network.chainId)
  );
  const defaultNetwork = allowedNetworks[0];
  const defaultToken = Object.values(tokenList[defaultNetwork.chainId])[0];

  return (
    <Box display="flex" gap={12} flexDirection="column">
      <Box display="flex" gap={8} alignItems="center">
        <Typography variant="h4">{campaign.title || campaign.name}</Typography>
        <ShareButton textToCopy={`cafecrypto.com/${campaign.name}`} />
      </Box>
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
