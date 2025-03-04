import { AxiosInstance } from "axios";

export async function signOutUser(api: AxiosInstance) {
  try {
    await api.get("/signout/");
  } catch (error) {
    console.error('Failed to sign out user ' + String(error))
  }
}
