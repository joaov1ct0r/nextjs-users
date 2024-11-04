import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const authorization = request.cookies.get("authorization");
  const user = request.cookies.get("user");
  const userObj = request.cookies.get("userObj");

  const cookiesNotFound = !authorization || !user || !userObj;

  if (
    cookiesNotFound &&
    request.nextUrl.pathname !== "/" &&
    request.nextUrl.pathname !== "/signup"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
