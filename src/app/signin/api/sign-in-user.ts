import SignInUser from "@/app/signin/interfaces/sign-in-user";
import { AxiosInstance } from "axios";

export async function signInUser(api: AxiosInstance, user: SignInUser) {
  try {
    const response = await api.post("/signin/", user);
    const authenticatedUser = response.data.resource;
    return authenticatedUser
  } catch (error) {
    throw new Error('Failed to sign in user ' + String(error))
  }
}
