import { db } from "@/lib/kysely";
import { Address } from "viem";

export async function createUser(address: Address): Promise<number> {
  const existingUser = await db
    .selectFrom("users")
    .select(["user_id", "name"])
    .where("address", "=", address)
    .executeTakeFirst();

  let user_id: number | undefined;
  if (!existingUser) {
    const newUser = await db
      .insertInto("users")
      .values({ address: address })
      .returning("user_id")
      .executeTakeFirst();
    user_id = newUser?.user_id;
  } else {
    user_id = existingUser.user_id;
  }

  if (!user_id) {
    throw new Error("Unable to create user");
  }

  return user_id;
}
