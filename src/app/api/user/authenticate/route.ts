import { Address, recoverMessageAddress } from "viem";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { GetUserCampaignsResponse } from "@/types/requests";
import { getUser, getUserByAddress } from "@/app/actions/user/getUser";
import { getUserCampaigns } from "@/app/actions/campaign/getCampaigns";

type SearchParams = {
  signature: Address;
  message: string;
};

export async function GET(
  request: NextRequest
): Promise<NextResponse<GetUserCampaignsResponse>> {
  const searchParams = request.nextUrl.searchParams;
  const signature = searchParams.get("signature") as SearchParams["signature"];
  const message = decodeURIComponent(
    searchParams.get("message") as SearchParams["message"]
  );

  if (!signature || !message) {
    return NextResponse.json({
      message: `No right params were provided`,
      user: null,
      status: 404,
    });
  }

  try {
    const userAddress = await recoverMessageAddress({ message, signature });
    const user = await getUserByAddress(userAddress.toLowerCase() as Address);
    const campaigns = await getUserCampaigns(user.user_id);

    return NextResponse.json({
      campaigns,
      user,
      status: 200,
    });
  } catch (e) {
    return NextResponse.json({
      message: `No user was found for your signature`,
      user: null,
      status: 404,
    });
  }
}
