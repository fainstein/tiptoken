import { sql } from "@vercel/postgres";
import { SocialMediaLinksRow, UsersRow } from "../../../types/db";
import { NewUser, User } from "../../../types/user";
import { Address } from "viem";

export async function getCampaignCreator(
  userId: number
): Promise<User | NewUser> {
  const { rows: userRows } =
    await sql<UsersRow>`SELECT * from users WHERE user_id=${userId};`;

  const baseUser = {
    user_id: userRows[0].user_id,
    address: userRows[0].address as Address,
    name: userRows[0].name,
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
