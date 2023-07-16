import connectDb from "@/app/utils/db";
import Profile from "@/models/Profile";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDataFromToken } from "@/app/helpers/getDataFromToken";

export async function PUT(request, { params }) {
  const body = await request.json();
  const { profileId } = params;
  console.log("from PUT", profileId);
  const userId = await getDataFromToken(request);
  //   const profiles = await Profile.find({ userId: userId });
  await connectDb();
  try {
    const profile = await Profile.find({ userId });
    // console.log("from profile PUT", profile);

    // if (profile.userId !== userId) {
    //   return NextResponse.json({ message: "you can only update your Profile" });
    // }

    const updatedProfile = await Profile.findByIdAndUpdate(
      { _id: profileId },
      body,
      { new: true }
    );
    return NextResponse.json(
      { data: updatedProfile },
      { message: "Profile Updated" }
    );
  } catch (error) {}
}
