import { db } from "@/lib/kysely";
import { StoredSocialMediaLinks, StoredUser } from "@/types/db";
import { User } from "@/types/user";
import { Address } from "viem";
import { transformUserWithSocial } from "../../transform/user";

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

async function getUserSocialLinks(
  userId: number
): Promise<StoredSocialMediaLinks[]> {
  const socials = await db
    .selectFrom("social_media_links")
    .selectAll()
    .where("user_id", "=", userId)
    .execute();

  return socials;
}

export async function getUserWithSocial(address: Address): Promise<User> {
  const user = await getUserByAddress(address);
  const socials = await getUserSocialLinks(user.user_id);

  return transformUserWithSocial(user, socials);
}
