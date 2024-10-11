import { Dispatch } from "react";
import User from "@/app/signup/interfaces/user";
import { api } from "@/app/lib/axios";
import { Action } from "@/app/signup/interfaces/action";

export default async function signUpUser(
  dispatch: Dispatch<Action>,
  user: User,
) {
  dispatch({ type: "fetch_start" });
  try {
    const response = await api.post("/signup/", user);

    if (response.status !== 201) {
      dispatch({ type: "fetch_error", error: "Failed to sign up user" });
    }

    dispatch({ type: "fetch_success" });
  } catch (error) {
    dispatch({ type: "fetch_error", error: "Failed to sign up user" });
  }
}
