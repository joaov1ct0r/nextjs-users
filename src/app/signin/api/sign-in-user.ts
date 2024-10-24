import { Dispatch } from "react";
import { Action } from "@/app/signin/interfaces/action";
import SignInUser from "@/app/signin/interfaces/sign-in-user";
import { api } from "@/app/lib/axios";
import { setCookie } from "@/app/utils/cookies";

export async function signInUser(dispatch: Dispatch<Action>, user: SignInUser) {
  dispatch({ type: "fetch_start" });
  try {
    const response = await api.post("/signin/", user);

    if (response.status !== 200) {
      dispatch({ type: "fetch_error", error: "Failed to sign in user" });
    }

    console.log("request", response.request);
    const authenticatedUserId = response.data.resource.id;
    setCookie({ name: "user", value: JSON.stringify(authenticatedUserId) });
    setCookie({ name: "authorization", value: "user" });
    dispatch({ type: "fetch_success", user: authenticatedUserId });
  } catch (error) {
    console.error(error);
    dispatch({ type: "fetch_error", error: "Failed to sign in user" });
  }
}
