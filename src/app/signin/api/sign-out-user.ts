import { Dispatch } from "react";
import { Action } from "@/app/signin/interfaces/action";
import { api } from "@/app/lib/axios";
import { clearCookies } from "@/app/utils/cookies";

export async function signOutUser(dispatch: Dispatch<Action>) {
  dispatch({ type: "fetch_start" });

  try {
    await api.get("/signout/");
    await clearCookies();

    dispatch({ type: "fetch_reset" });
  } catch (error) {
    console.error(error);
    dispatch({
      type: "fetch_error",
      error: "Failed to sign out user",
    });
  }
}
