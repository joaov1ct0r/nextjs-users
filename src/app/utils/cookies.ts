"use server";

import { cookies } from "next/headers";

export interface setCookieProps {
  user: string;
  authorization: string;
}

export async function setCookie({
  user,
  authorization,
}: setCookieProps): Promise<void> {
  const cookieStore = cookies();
  const expiresDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

  cookieStore.set({
    name: "user",
    value: user,
    expires: expiresDate,
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    path: "/",
    secure: true,
    domain: "crud.shop",
    sameSite: "none",
    priority: "high",
    partitioned: false,
  });
  cookieStore.set({
    name: "authorization",
    value: authorization,
    expires: expiresDate,
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    path: "/",
    secure: true,
    domain: "crud.shop",
    sameSite: "none",
    priority: "high",
    partitioned: false,
  });
}

export interface hasCookieProps {
  name: string;
}
export async function hasCookie({ name }: hasCookieProps): Promise<boolean> {
  const cookieStore = cookies();
  const isCookiePresent = cookieStore.has(name);
  return isCookiePresent;
}
