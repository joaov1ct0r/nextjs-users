import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const authorization = request.cookies.get("authorization");
  const user = request.cookies.get("user");

  if (authorization && user) {
    return NextResponse.next();
  }

  const cookieNotFound = !authorization || !user;

  if (cookieNotFound && request.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
