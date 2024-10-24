import { Dispatch } from "react";
import { Action } from "@/app/signin/interfaces/action";
import SignInUser from "@/app/signin/interfaces/sign-in-user";
import { api } from "@/app/lib/axios";
//import { setCookie } from "@/app/utils/cookies";
import { cookies } from "next/headers";

export async function signInUser(dispatch: Dispatch<Action>, user: SignInUser) {
  dispatch({ type: "fetch_start" });
  try {
    const response = await api.post("/signin/", user);

    if (response.status !== 200) {
      dispatch({ type: "fetch_error", error: "Failed to sign in user" });
    }

    const authenticatedUser = response.data.resource;
    const expiresDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    const cookieStore = cookies();

    cookieStore.set({
      name: "user",
      value: JSON.stringify(authenticatedUser),
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
    console.log("setou user");
    cookieStore.set({
      name: "authentication",
      value: JSON.stringify(authenticatedUser),
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
    console.log("setou authorization");
    dispatch({ type: "fetch_success", user: authenticatedUser });
  } catch (error) {
    console.error(error);
    dispatch({ type: "fetch_error", error: "Failed to sign in user" });
  }
}
