import { TokenAddress, TokenPrices } from "@/types/ethereum";
import { DefiLlamaGetPrices } from "@/types/requests";
import { transformTokenPrices } from "../../transform/tokenPrices";

const DEFILLAMA_BASE_URL = "https://coins.llama.fi";

export const getTokenPrices = async ({
  networkName,
  tokens,
}: {
  networkName: string;
  tokens: TokenAddress[];
}): Promise<TokenPrices> => {
  const tokensParam = tokens
    .map((token) => `${networkName}:${token}`)
    .join(",");
  const response = await fetch(
    `${DEFILLAMA_BASE_URL}/prices/current/${tokensParam}`
  );
  const prices = (await response.json()) as DefiLlamaGetPrices;
  return transformTokenPrices(prices);
};
