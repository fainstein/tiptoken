import { Address } from "viem";
import { NextResponse } from "next/server";
import { GetUserByAddressResponse } from "@/types/requests";
import { getUserByAddress } from "@/app/actions/user/getUser";

type Params = {
  address: Address;
};

export async function GET(
  request: Request,
  context: { params: Params }
): Promise<NextResponse<GetUserByAddressResponse>> {
  if (!context.params.address) {
    return NextResponse.json({
      message: `No address was provided`,
      status: 404,
    });
  }
  try {
    const user = await getUserByAddress(context.params.address);
    return NextResponse.json({
      user,
      status: 200,
    });
  } catch (e) {
    return NextResponse.json({
      message: `No user was found for the address ${context.params.address}`,
      status: 404,
    });
  }
}
