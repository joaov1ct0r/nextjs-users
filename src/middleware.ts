import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const authorization = request.cookies.get("authorization");
  const user = request.cookies.get("user");
  const userObj = request.cookies.get("userObj");

  if (
    authorization &&
    user &&
    userObj &&
    request.nextUrl.pathname !== "/about"
  ) {
    return NextResponse.redirect(new URL("/about", request.url));
  }

  const cookieNotFound = !authorization || !user;

  if (
    cookieNotFound &&
    request.nextUrl.pathname !== "/" &&
    request.nextUrl.pathname !== "/signup"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  //matcher: ["/about", "/", "/signup", "/signin", "/(.*)"], // Garante que o middleware funcione nessas rotas
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
