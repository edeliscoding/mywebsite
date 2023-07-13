import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const response = NextResponse.json({
      message: "Logout Successful",
      success: true,
    });
    response.cookies.set("accessToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
