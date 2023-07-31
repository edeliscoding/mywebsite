import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/register";
  const token = request.cookies.get("accessToken")?.value || "";
  try {
    if (isPublicPath && token) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    // if (!isPublicPath && token) {
    //   return NextResponse.redirect(new URL(request.nextUrl));
    // }
  } catch (error) {}
}

export const config = {
  matcher: ["/addprofile", "/dashboard", "/editdashboard"],
};
