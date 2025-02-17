import User from "@/app/signup/interfaces/user";
import { AxiosInstance } from "axios";

export async function signUpUser(
  api: AxiosInstance,
  user: User,
) {
  try {
    const form = new FormData();
    const userBlob = new Blob(
      [
        JSON.stringify({
          email: user.email,
          username: user.username,
          name: user.name,
          password: user.password,
        }),
      ],
      { type: "application/json" },
    );

    form.append("user", userBlob);

    if (user.file) {
      form.append("file", user.file);
    }

    await api.post("/signup/", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { success: true }
  } catch (e) {
    throw new Error('Failed to sign up user ' + String(e))
  }
}
