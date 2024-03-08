import { sql } from "@vercel/postgres";
import { SocialMediaLinksRow } from "../../../types/db";
import { NewUser, User } from "../../../types/user";
import { Address } from "viem";
import { db } from "@/lib/kysely";

export async function getCampaignCreator(
  userId: number
): Promise<User | NewUser> {
  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("user_id", "=", userId)
    .executeTakeFirst();

  if (!user) {
    throw new Error(`No creator was found with an id of ${userId}`);
  }

  const baseUser = {
    user_id: user.user_id,
    address: user.address as Address,
    name: user.name,
  };

  if (!baseUser.name) {
    return baseUser;
  } else {
    const { rows: socialRows } =
      await sql<SocialMediaLinksRow>`SELECT * from social_media_links WHERE user_id=${userId};`;

    const socialLinks = socialRows.reduce<User["socialLinks"]>(
      (acc, socialRow) => {
        const newAcc = { ...acc };
        newAcc[socialRow.platform] = socialRow.username;
        return acc;
      },
      {}
    );

    return { ...baseUser, socialLinks };
  }
}
