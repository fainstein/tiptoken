import { TokenPrices } from "@/types/ethereum";
import { DefiLlamaGetPrices } from "@/types/requests";
import { Address } from "viem";

export const transformTokenPrices = (
  tokenPrices: DefiLlamaGetPrices
): TokenPrices => {
  const parsedPrices = Object.entries(tokenPrices.coins).reduce<TokenPrices>(
    (acc, [tokenKey, tokenData]) => {
      const newAcc = { ...acc };
      const [, tokenAddress] = tokenKey.split(":");
      newAcc[tokenAddress as Address] = tokenData.price;
      return newAcc;
    },
    {}
  );
  return parsedPrices;
};
