import { StoredSocialMediaLinks, StoredUser } from "@/types/db";
import { User, UserSocial } from "@/types/user";

export const transformUserWithSocial = (
  user: StoredUser,
  socials: StoredSocialMediaLinks[]
): User => {
  const socialLinks = socials.reduce<UserSocial>((acc, curr) => {
    acc[curr.platform] = curr.url;
    return acc;
  }, {});

  return {
    address: user.address,
    name: user.name || undefined,
    user_id: user.user_id,
    socialLinks,
  };
};
