import { Dispatch } from "react";
import { Action } from "@/app/signin/interfaces/action";
import SignInUser from "@/app/signin/interfaces/sign-in-user";
import { api } from "@/app/lib/axios";
import { setCookie } from "@/app/utils/cookies";

export async function signInUser(dispatch: Dispatch<Action>, user: SignInUser) {
  dispatch({ type: "fetch_start" });
  try {
    const response = await api.post("/signin/", user);
    const authenticatedUser = response.data.resource;

    setCookie({
      user: JSON.stringify(authenticatedUser),
    });

    dispatch({ type: "fetch_success" });
  } catch (error) {
    console.error(error);
    dispatch({
      type: "fetch_error",
      error: "Failed to sign in user",
    });
  }
}
