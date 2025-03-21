import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const authorization = request.cookies.get("authorization");
  const user = request.cookies.get("user");
  const userObj = request.cookies.get("userObj");

  const cookiesNotFound = !authorization || !user || !userObj;

  if (
    cookiesNotFound &&
    request.nextUrl.pathname !== "/signin" &&
    request.nextUrl.pathname !== "/signup" &&
    request.nextUrl.pathname !== "/forget-password"
  ) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (
    authorization &&
    user &&
    userObj &&
    request.nextUrl.pathname !== "/about"
  ) {
    return NextResponse.redirect(new URL("/about", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
