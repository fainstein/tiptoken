import { db } from "@/lib/kysely";
import { UsersTable, ValidPlatforms } from "@/types/db";
import { UpdateUser } from "@/types/requests";
import { revalidatePath } from "next/cache";

export async function updateUser(user: UpdateUser): Promise<void> {
  await db
    .updateTable("users")
    .set("name", user.name)
    .where("user_id", "=", user.user_id)
    .execute();

  const socialsObj = Object.entries(user.socialLinks || {}).map(
    ([platform, url]) => ({
      platform: platform as ValidPlatforms,
      url,
      user_id: user.user_id,
    })
  );

  await db
    .insertInto("social_media_links")
    .values(socialsObj)
    .onConflict((oc) =>
      oc
        .columns(["user_id", "platform"])
        .doUpdateSet({ url: (eb) => eb.ref("excluded.url") })
    )
    .execute();
  // TODO: Remove row when new url is empty

  revalidatePath(`/user`);
}
