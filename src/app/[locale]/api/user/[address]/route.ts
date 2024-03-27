import { Address } from "viem";
import { getUserByAddress } from "../../../../actions/user/getUser";
import { NextResponse } from "next/server";

type Params = {
  address: Address;
};

export async function GET(request: Request, context: { params: Params }) {
  try {
    const user = await getUserByAddress(context.params.address);

    return NextResponse.json({
      user,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      message: `No user was found for the address ${context.params.address}`,
      status: 404,
    });
  }
}
