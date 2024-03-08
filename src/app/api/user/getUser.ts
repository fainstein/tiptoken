import { db } from "@/lib/kysely";
import { StoredUser } from "@/types/db";

export async function getUser(userId: number): Promise<StoredUser> {
  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("user_id", "=", userId)
    .executeTakeFirstOrThrow();

  return user;
}
