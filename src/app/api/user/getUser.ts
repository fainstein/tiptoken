import { UsersRow } from "@/types/db";
import { sql } from "@vercel/postgres";

export async function getUser(userId: number): Promise<UsersRow> {
  const { rows } =
    await sql<UsersRow>`SELECT * FROM users WHERE user_id=${userId};`;
  return rows[0];
}
