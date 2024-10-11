import { Dispatch } from "react";
import { Action } from "@/app/signin/interfaces/action";
import SignInUser from "@/app/signin/interfaces/sign-in-user";
import { api } from "@/app/lib/axios";
import { toast } from "react-toastify";

export async function signInUser(dispatch: Dispatch<Action>, user: SignInUser) {
  dispatch({ type: "fetch_start" });
  try {
    const response = await api.post("/signin/", user);

    if (response.status !== 200) {
      dispatch({ type: "fetch_error", error: "Failed to sign in user" });
      toast.error("Failed to sign in user");
    }

    dispatch({ type: "fetch_success", user: response.data.resource });
    toast.success("Signed in with success");
  } catch (error) {
    dispatch({ type: "fetch_error", error: "Failed to sign in user" });
    toast.error("Failed to sign in user");
  }
}
