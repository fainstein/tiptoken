import { db } from "@/lib/kysely";

export const getCampaignNameValidation = async (name: string): Promise<boolean> => {
  const nameExists = await db
    .selectFrom("campaigns")
    .selectAll()
    .where("name", "=", name)
    .executeTakeFirst();

  return !nameExists;
};
