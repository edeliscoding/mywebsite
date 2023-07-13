import connectDb from "../../../utils/db";
import { NextResponse } from "next/server";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const { username, email, password } = await request.json();
  try {
    await connectDb();
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    return NextResponse.json({ message: "user created" }, { status: 201 });
  } catch (error) {
    // return NextResponse.json(
    //   { message: "Something went wrong" },
    //   { status: 500 }
    // );
    console.log(error);
  }
}
