import { Address } from "viem";
import { ValidPlatforms } from "./db";

export interface NewUser {
  user_id: number;
  address: Address;
}

export type UserSocial = Partial<Record<ValidPlatforms, string>>;

export interface User extends NewUser {
  name?: string;
  socialLinks?: UserSocial;
}
