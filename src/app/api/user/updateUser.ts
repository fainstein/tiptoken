import { UsersRow } from "@/types/db";
import { UpdateUser } from "@/types/requests";
import { sql } from "@vercel/postgres";

export async function updateUser(user: UpdateUser): Promise<void> {
  console.log("USER", user);
  await sql<UsersRow>`UPDATE users SET name = ${user.name} WHERE user_id=${user.user_id};`;
}
