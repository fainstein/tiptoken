import { db } from "@/lib/kysely";
import { StoredUser } from "@/types/db";
import { Address } from "viem";

export async function getUser(userId: number): Promise<StoredUser> {
  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("user_id", "=", userId)
    .executeTakeFirstOrThrow();

  return user;
}

export async function getUserByAddress(address: Address): Promise<StoredUser> {
  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("address", "=", address)
    .executeTakeFirstOrThrow();

  return user;
}
