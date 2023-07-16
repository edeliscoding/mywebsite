import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import connectDb from "@/app/utils/db";
import Profile from "@/models/Profile";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDb();
  try {
    const userId = await getDataFromToken(request);
    const profiles = await Profile.find({ userId: userId });
    console.log(profiles);
    // console.log("from Users Route", userId);
    return NextResponse.json({
      message: "user found",
      data: profiles,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request) {
  const body = await request.json();
  console.log("from api/users", body);
  await connectDb();
  try {
    const userId = await getDataFromToken(request);
    const addedProfile = new Profile({
      ...body,
      userId: userId,
    });
    console.log("from trycatch", addedProfile);
    await addedProfile.save();
    // console.log("from Users Route", userId);
    return NextResponse.json({
      message: "Your Profile has been created",
      data: addedProfile,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
