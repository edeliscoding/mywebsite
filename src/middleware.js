import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/register";
  try {
    const token = request.cookies.get("accessToken")?.value || "";

    // if (isPublicPath && token) {
    //   return NextResponse.redirect(new URL("/", request.nextUrl));
    // }

    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  } catch (error) {}
}

export const config = {
  matcher: ["/login", "/register", "/addprofile", "/dashboard"],
};
