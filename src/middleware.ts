import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/app/utils/is-authenticated";

export default function middleware(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|signin|signup|forget-password).*)"],
};
