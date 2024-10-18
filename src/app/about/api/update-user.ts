import { Dispatch } from "react";
import { Action } from "@/app/about/interfaces/action";
import { User } from "@/app/about/interfaces/user";
import { api } from "@/app/lib/axios";

export async function updateUser(dispatch: Dispatch<Action>, user: User) {
  dispatch({ type: "fetch_start" });
  try {
    const response = await api.put("/user/", user);

    if (response.status !== 204) {
      dispatch({ type: "fetch_error", error: "Failed to update user" });
    }

    dispatch({ type: "fetch_success", user: response.data.resource });
  } catch (error) {
    console.error(error);
    dispatch({ type: "fetch_error", error: "Failed to update user" });
  }
}
