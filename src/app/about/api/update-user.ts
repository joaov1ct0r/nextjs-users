import { AxiosInstance } from "axios";
import { UpdateUserFormSchema } from "@/app/about/interfaces/update-user-form-schema";

export async function updateUser(api: AxiosInstance, data: UpdateUserFormSchema) {
    try {
        const form = new FormData();
        const userBlob = new Blob([JSON.stringify(data)], {
            type: "application/json",
        });

        form.append("user", userBlob);

        if (data.file && data.file.length > 0) {
            form.append("file", data.file[0]);
        }

        await api.put("/user/", form, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return { success: true }

    } catch (error) {
        console.error("Failed to update user " + String(error))
    }
}