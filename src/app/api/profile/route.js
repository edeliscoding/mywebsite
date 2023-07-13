import connectDb from "@/app/utils/db";
import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Profile from "@/models/Profile";

export async function POST(request) {
  const body = await request.json();
  const cookieStore = cookies();
  const userToken = cookieStore.get("accessToken");
  const id = userToken.value;
  console.log("body", body);
  console.log("id", id);
  // try {
  //   await connectDb();
  //   const cookieStore = cookies();
  //   const profileToken = cookieStore.get("accessToken");
  //   // console.log("profile token", profileToken);
  //   const token = profileToken.value;

  //   jwt.verify(token, "34343d43435132434abe235", async (err, payload) => {
  //     // const token = payload.value;
  //     // console.log("token", token);
  //     // console.log("jwt verify payload", payload);
  //     const newProfile = new Profile({
  //       ...body,
  //       // userId: token.id,
  //     });
  //     await newProfile.save();

  //     return NextResponse.json(
  //       { message: "Your profile has been updated" },
  //       { status: 201 }
  //     );
  //   });
  // } catch (error) {
  //   return NextResponse.json(
  //     { message: "Something went wrong" },
  //     { status: 500 }
  //   );
  // }
}

// export async function GET(request) {
//   await connectDb();
//   const cookieStore = cookies();
//   const profileToken = cookieStore.get("accessToken");
//   if (!profileToken)
//     return NextResponse.json({ message: "You are not authenticated" });
//   try {
//     const token = profileToken.value;
//     // have to perform checks in the payload
//     jwt.verify(token, "34343d43435132434abe235", async (err, payload) => {
//       const id = payload.id;
//       console.log("paylod id should be f5c7", id);
//       const getProfiles = await Profile.find({
//         userId: id,
//       });
//       console.log("Get Profile", getProfiles);
//       return new NextResponse(JSON.stringify(getProfiles), { status: 200 });
//       // console.log("from verify GET", payload); // { id: '64ac4587ecd7c1401659f5c7', role: 'user', iat: 1689036813 }
//     });
//   } catch (error) {
//     return new NextResponse("Database Error", { status: 500 });
//   }
// }

export async function GET(request) {
  const userId = localStorage.getItem("currentUser")._id;
  await connectDb();
  const cookieStore = cookies();
  const profileToken = cookieStore.get("accessToken");
  if (!profileToken)
    return NextResponse.json({ message: "You are not authenticated" });
  try {
    // const token = profileToken.value;
    // const decoded = jwt.verify(token, "34343d43435132434abe235");
    // const id = decoded.id;
    return NextResponse.json({ userId });
  } catch (error) {
    return NextResponse.json({ message: "Request failed" });
  }
}
