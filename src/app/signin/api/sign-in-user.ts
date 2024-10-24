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
    const authenticatedUser = response.data.resource;
    setCookie({ name: "user", value: JSON.stringify(authenticatedUser) });
    console.log("setou user");
    setCookie({
      name: "authorization",
      value: JSON.stringify(authenticatedUser),
    });
    console.log("setou authorization");
    setCookie({
      name: "teste",
      value: "any",
    });
    console.log("setou teste");
    setCookie({
      name: "teste1",
      value: "anyOther",
    });
    console.log("setou teste1");
    dispatch({ type: "fetch_success", user: authenticatedUser });
  } catch (error) {
    console.error(error);
    dispatch({ type: "fetch_error", error: "Failed to sign in user" });
  }
}
