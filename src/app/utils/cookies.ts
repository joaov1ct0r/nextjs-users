"use server";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

interface setCookieProps {
  user: string;
}

export async function setCookie({ user }: setCookieProps): Promise<void> {
  const cookieStore = cookies();
  const expiresDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

  cookieStore.set({
    name: "userObj",
    value: user,
    expires: expiresDate,
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    path: "/",
    secure: true,
    domain: process.env.NODE_ENV === 'production' ? "https://crud.shop" : "localhost",
    sameSite: "none",
    priority: "high",
    partitioned: false,
  });
}

interface hasCookieProps {
  name: string;
}
export async function hasCookie({ name }: hasCookieProps): Promise<boolean> {
  const cookieStore = cookies();
  const isCookiePresent = cookieStore.has(name);
  return isCookiePresent;
}

interface getCookiesProps {
  name: string;
}

export async function getCookie({
  name,
}: getCookiesProps): Promise<undefined | RequestCookie> {
  const cookieStore = cookies();
  const cookie = cookieStore.get(name);
  return cookie;
}

export async function clearCookies() {
  const cookieStore = cookies();
  cookieStore.set({
    name: "userObj",
    value: "",
    maxAge: 0,
    domain: ".crud.shop",
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "none",
  });
  cookieStore.set({
    name: "user",
    value: "",
    maxAge: 0,
    domain: ".crud.shop",
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "none",
  });
  cookieStore.set({
    name: "authorization",
    value: "",
    maxAge: 0,
    domain: ".crud.shop",
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "none",
  });
}
