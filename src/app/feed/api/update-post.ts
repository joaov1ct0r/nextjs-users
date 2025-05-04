import { AxiosInstance } from "axios";
import { UpdatePostFormSchema } from "../interfaces/update-post-form-schema";

export interface UpdatePostResponse {
    success: boolean
}

export async function updatePost(api: AxiosInstance, data: UpdatePostFormSchema): Promise<UpdatePostResponse> {
    try {
        await api.put("/post/", data)

        return { success: true }
    } catch(error) {
        console.error("Failed to update post: ", String(error))
        return { success: false }
    }
}