import { UsersTable } from "@/types/db";
import { UpdateUser } from "@/types/requests";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function updateUser(user: UpdateUser): Promise<void> {
  await sql<UsersTable>`UPDATE users SET name = ${user.name} WHERE user_id=${user.user_id};`;
  revalidatePath(`/user/${user.user_id}`);
}
