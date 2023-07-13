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
  

export async function GET(request) {
  const userId = localStorage.getItem("currentUser")._id;
  await connectDb();
  const cookieStore = cookies();
  const profileToken = cookieStore.get("accessToken");
  if (!profileToken)
    return NextResponse.json({ message: "You are not authenticated" });
  try {
   
    return NextResponse.json({ userId });
  } catch (error) {
    return NextResponse.json({ message: "Request failed" });
  }
}
