import { TokenAddress } from "./ethereum";
import { User } from "./user";

export type UpdateUser = Omit<User, "address">;

type TokenKey = `${string}:${TokenAddress}`;

export interface DefiLlamaGetPrices {
  coins: Record<
    TokenKey,
    {
      decimals: number;
      price: number;
      symbol: string;
      timestamp: number;
    }
  >;
}
