import { AxiosInstance } from "axios";
import { SignUpFormSchema } from "../interfaces/sign-up-form-schema";

export async function signUpUser(
  api: AxiosInstance,
  user: SignUpFormSchema,
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

    if (user.file?.length !== undefined && user.file?.length > 0) {
      form.append("file", user.file[0]);
    }

    await api.post("/signup/", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { success: true }
  } catch (e) {
    console.error('Failed to sign up user ' + String(e))
  }
}
