import { Address } from "viem";
import { NextRequest, NextResponse } from "next/server";
import { GetCampaignNameValidation } from "@/types/requests";
import { getCampaignNameValidation } from "@/app/actions/campaign/getCampaignNameValidation";

type SearchParams = {
  name: string;
};

export async function GET(
  request: NextRequest
): Promise<NextResponse<GetCampaignNameValidation>> {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name") as SearchParams["name"];
  //   const signature = searchParams.get("signature") as SearchParams["signature"];
  //   const message = decodeURIComponent(
  // searchParams.get("message") as SearchParams["message"]
  //   );

  if (!name) {
    return NextResponse.json({
      message: `No right params were provided`,
      isValid: null,
      status: 404,
    });
  }

  try {
    const isValid = await getCampaignNameValidation(name.toLowerCase());
    return NextResponse.json({
      isValid,
      status: 200,
    });
  } catch (e) {
    return NextResponse.json({
      isValid: null,
      message: `There was an error validating the name ${name}`,
      status: 500,
    });
  }
}
