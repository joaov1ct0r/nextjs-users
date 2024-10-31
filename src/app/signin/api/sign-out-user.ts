import { Dispatch } from "react";
import { Action } from "@/app/signin/interfaces/action";
//import { api } from "@/app/lib/axios";
import { clearCookies } from "@/app/utils/cookies";

export async function signOutUser(dispatch: Dispatch<Action>) {
  //dispatch({ type: "fetch_start" });

  try {
    //const response = await api.get("/signout/");

    //if (response.status !== 200) {
    //dispatch({ type: "fetch_error", error: "Failed to sign out user" });
    //}

    await clearCookies();
    //dispatch({
    //type: "fetch_reset",
    //user: null,
    //error: null,
    //loading: false,
    //success: null,
    //});
  } catch (error) {
    console.error(error);
    dispatch({ type: "fetch_error", error: "Failed to sign out user" });
  }
}
