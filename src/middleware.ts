import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const authorization = request.cookies.get("authorization");
  console.log("authorization", authorization);
  const user = request.cookies.get("user");
  console.log("user", user);
  const userObj = request.cookies.get("userObj");
  console.log("userObj", userObj);

  if (
    authorization &&
    user &&
    userObj &&
    request.nextUrl.pathname !== "/about"
  ) {
    console.log("send to /about");
    //return NextResponse.redirect(new URL("/about", request.url));
  }

  const cookiesNotFound = !authorization || !user;
  console.log("cookiesNotFound", cookiesNotFound);

  if (
    cookiesNotFound &&
    request.nextUrl.pathname !== "/" &&
    request.nextUrl.pathname !== "/signup"
  ) {
    console.log("send to /");
    //return NextResponse.redirect(new URL("/", request.url));
  }

  console.log("send to next req");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
