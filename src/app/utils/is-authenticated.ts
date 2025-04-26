import { NextRequest } from "next/server";

export function isAuthenticated(request: NextRequest) {
    let isAuthenticated = true
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
        isAuthenticated = false
        return isAuthenticated
    }

    return isAuthenticated
}