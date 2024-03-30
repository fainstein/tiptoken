import { HttpStatusCode } from "axios";
import { TokenAddress } from "./ethereum";
import { User } from "./user";
import { StoredUser } from "./db";
import { StoredCampaign } from "./campaign";

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

export interface BaseResponse {
  status: HttpStatusCode;
  message?: string;
}

export interface GetUserByAddressResponse extends BaseResponse {
  user?: StoredUser;
}

export interface GetUserCampaignsResponse extends BaseResponse {
  campaigns?: StoredCampaign[];
  user: StoredUser | null;
}
