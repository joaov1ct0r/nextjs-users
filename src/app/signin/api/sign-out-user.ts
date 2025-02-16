import { AxiosInstance } from "axios";

export async function signOutUser(api: AxiosInstance) {
  try {
    await api.get("/signout/");
  } catch (error) {
    throw new Error('Failed to sign out user ' + String(error))
  }
}
