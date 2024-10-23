"use server";

import { cookies } from "next/headers";

export interface setCookieProps {
  name: string;
  value: string;
}

export async function setCookie({ name, value }: setCookieProps) {
  const cookieStore = cookies();
  const expiresDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

  cookieStore.set({
    name,
    value,
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
