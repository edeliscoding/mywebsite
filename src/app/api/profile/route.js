import connectDb from "@/app/utils/db";
import Profile from "@/models/Profile";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDataFromToken } from "@/app/helpers/getDataFromToken";

export async function GET(request) {
  await connectDb();
  try {
    const userId = await getDataFromToken(request);
    const profiles = await Profile.find({ userId: userId });
    // console.log("from Users Route", userId);
    return NextResponse.json({
      message: "user found",
      data: profiles,
    });
  } catch (error) {
    return NextResponse.json({ message: "ERROR OCCURED" });
  }
}
// export async function GET(request) {
//   const cookieStore = cookies();
//   const userToken = cookieStore.get("accessToken");
//   if (!userToken) {
//     return NextResponse.json({ message: "You are not authenticated" });
//   }
//   const userId = userToken.value;
//   await connectDb();
//   try {
//     const profile = await Profile.findById(userId);

//     if (profile.userId !== userId) {
//       return NextResponse.json({ message: "you can only update your Profile" });
//     }

//     const updatedProfile = await Profile.findByIdAndUpdate(
//       { _id: profile },
//       body,
//       { new: true }
//     );
//     return NextResponse.json(
//       { data: updatedProfile },
//       { message: "Profile Updated" }
//     );
//   } catch (error) {}
// }

// export async function PUT(request) {
//   const body = await request.json();
//   const {userId} = body
//   console.log("from PUT api handler", body);
//   const cookieStore = cookies();
//   const userToken = cookieStore.get("accessToken");
//   const userId = userToken.value;
//   await connectDb();
//   try {
//     const profile = await Profile.find({userId});
//     console.log("from profile PUT", profile);

//     if (profile.userId !== userId) {
//       return NextResponse.json({ message: "you can only update your Profile" });
//     }

//     const updatedProfile = await Profile.findByIdAndUpdate(
//       { _id: profile },
//       body,
//       { new: true }
//     );
//     return NextResponse.json(
//       { data: updatedProfile },
//       { message: "Profile Updated" }
//     );
//   } catch (error) {}
// }

// export async function PUT(request, { params }) {
//   const body = await request.json();
//   const { id } = params;
//   console.log("from PUT", id);
//   const userId = await getDataFromToken(request);
//   const profiles = await Profile.find({ userId: userId });
//   await connectDb();
//   try {
//     const profile = await Profile.find({ userId });
//     console.log("from profile PUT", profile);

//     if (profile.userId !== userId) {
//       return NextResponse.json({ message: "you can only update your Profile" });
//     }

//     const updatedProfile = await Profile.findByIdAndUpdate(
//       { _id: profile },
//       body,
//       { new: true }
//     );
//     return NextResponse.json(
//       { data: updatedProfile },
//       { message: "Profile Updated" }
//     );
//   } catch (error) {}
// }
