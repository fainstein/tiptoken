import {
  CampaignWithOwner,
  OpenCampaign,
  StoredCampaign,
} from "@/types/campaign";
import { transformCampaigns } from "../../transform/campaign";
import { getUser } from "../user/getUser";
import { db } from "@/lib/kysely";
import { StoredCampaignAllowedChains } from "@/types/db";
import { getCampaignAllowedChains } from "./getCampaignAllowedTokens";
import { sql } from "kysely";
import { redirect } from "next/navigation";

const getCampaignExtraData = async (
  campaignId: number,
  userId: number
): Promise<{
  allowedChains: StoredCampaignAllowedChains[];
  ownerAddress: string;
}> => {
  const allowedChains = await getCampaignAllowedChains(campaignId);
  const user = await getUser(userId);
  return { allowedChains, ownerAddress: user.address };
};

export const getRecentCampaigns = async (): Promise<CampaignWithOwner[]> => {
  const campaigns = await db
    .selectFrom("campaigns")
    .innerJoin("users", "users.user_id", "campaigns.user_id")
    .select([
      "campaign_id",
      "campaigns.name as campaign_name",
      "cafe_crypto_unit",
      "goal_cc",
      "end_date",
      "campaigns.user_id",
      "total_received",
      "is_open",
      "description",
      "created_at",
      "users.address as user_address",
      "users.name as user_name",
      "title",
    ])
    .orderBy("created_at", "desc")
    .limit(12)
    .execute();

  return campaigns.map(
    ({
      campaign_id,
      created_at,
      is_open,
      campaign_name,
      total_received,
      end_date,
      goal_cc,
      cafe_crypto_unit,
      user_id,
      description,
      user_address,
      user_name,
      title,
    }) => ({
      allowedChainIds: [],
      campaignId: campaign_id,
      createdAt: created_at,
      isOpen: is_open,
      name: campaign_name,
      totalReceived: total_received,
      endDate: end_date,
      cafeCryptoUnit: cafe_crypto_unit,
      goalCC: goal_cc,
      owner: user_address,
      user_name: user_name,
      userId: user_id,
      description,
      title,
    })
  );
};

export const getPopularCampaigns = async (): Promise<CampaignWithOwner[]> => {
  const campaigns = await db
    .selectFrom("campaigns")
    .innerJoin("users", "users.user_id", "campaigns.user_id")
    .select([
      "campaign_id",
      "campaigns.name as campaign_name",
      "cafe_crypto_unit",
      "goal_cc",
      "end_date",
      "campaigns.user_id",
      "total_received",
      "is_open",
      "description",
      "created_at",
      "users.address as user_address",
      "users.name as user_name",
      "title",
    ])
    .orderBy(sql`campaigns.cafe_crypto_unit * campaigns.total_received`, "desc")
    .limit(12)
    .execute();

  return campaigns.map(
    ({
      campaign_id,
      created_at,
      is_open,
      campaign_name,
      total_received,
      end_date,
      goal_cc,
      cafe_crypto_unit,
      user_id,
      description,
      user_address,
      user_name,
      title,
    }) => ({
      allowedChainIds: [],
      campaignId: campaign_id,
      createdAt: created_at,
      isOpen: is_open,
      name: campaign_name,
      totalReceived: total_received,
      endDate: end_date,
      cafeCryptoUnit: cafe_crypto_unit,
      goalCC: goal_cc,
      owner: user_address,
      user_name: user_name,
      userId: user_id,
      description,
      title,
    })
  );
};

export async function getCampaignByName(
  campaignName: string
): Promise<StoredCampaign> {
  try {
    const campaign = await db
      .selectFrom("campaigns")
      .selectAll()
      .where("name", "=", campaignName)
      .executeTakeFirstOrThrow();

    const { campaign_id, user_id } = campaign;
    const { allowedChains, ownerAddress } = await getCampaignExtraData(
      campaign_id,
      user_id
    );

    return transformCampaigns({
      campaigns: [campaign],
      allowedChains,
      ownerAddress,
    })[0];
  } catch (e) {
    redirect("/");
  }
}

export async function getUserCampaigns(
  userId: number
): Promise<StoredCampaign[]> {
  const campaigns = await db
    .selectFrom("campaigns")
    .selectAll()
    .where("user_id", "=", userId)
    .execute();

  return transformCampaigns({
    campaigns,
    allowedChains: [],
    ownerAddress: "0x",
  });
}
