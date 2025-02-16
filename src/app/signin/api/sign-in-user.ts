import { AxiosInstance } from "axios";
import { SignInFormSchema } from "@/app/signin/interfaces/sign-in-form-schema"

export async function signInUser(api: AxiosInstance, user: SignInFormSchema) {
  try {
    const response = await api.post("/signin/", user);
    const authenticatedUser = response.data.resource;
    return authenticatedUser
  } catch (error) {
    throw new Error('Failed to sign in user ' + String(error))
  }
}
