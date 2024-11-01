import { Dispatch } from "react";
import { Action } from "@/app/about/interfaces/action";
import { User } from "@/app/about/interfaces/user";
import { api } from "@/app/lib/axios";

interface UserData {
  name: string;
  username: string;
  email: string;
  id: string;
  password: string | undefined;
}

export async function updateUser(dispatch: Dispatch<Action>, user: User) {
  const data: UserData = {
    name: user.name,
    username: user.username,
    email: user.email,
    id: user.id,
    password: undefined,
  };

  if (user.password) {
    data.password = user.password;
  }

  dispatch({ type: "fetch_start" });
  try {
    const response = await api.put("/user/", data);

    if (response.status !== 204) {
      dispatch({ type: "fetch_error", error: "Failed to update user" });
    }

    dispatch({ type: "fetch_success", user: response.data.resource });
  } catch (error) {
    console.error(error);
    dispatch({ type: "fetch_error", error: "Failed to update user" });
  }
}
