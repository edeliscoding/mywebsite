import connectDb from "@/app/utils/db";
import { NextResponse } from "next/server";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) {
  const { email, password } = await request.json();
  try {
    await connectDb();
    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.json({ message: "no user found" }, { status: 401 });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      "34343d43435132434abe235"
    );
    // const { password, ...logininfo } = user._doc;

    // return NextResponse.cookie("accessToken", token, {
    //   httpOnly: true,
    // });

    const response = NextResponse.json(
      { message: "User created", data: user },
      { status: 200 }
    );
    response.cookies.set("accessToken", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
