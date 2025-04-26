import { CreatePostFormSchema } from "@/app/feed/interfaces/create-post-form-schema";
import { AxiosInstance } from "axios";

export interface CreatePostResponse {
    success: boolean
}

export async function createPost(api: AxiosInstance, post: CreatePostFormSchema): Promise<CreatePostResponse> {
    try {
        await api.post("/post/", post)

        return { success: true }

    } catch(error) {
        console.error("Falha ao criar post: ", error)
        return { success: false }
    }
}