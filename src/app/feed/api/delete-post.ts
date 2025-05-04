import { AxiosInstance } from "axios"

export interface DeletePostResponse {
    success: boolean
}

export async function deletePost(api: AxiosInstance, postId: string): Promise<DeletePostResponse> {
    try {
        await api.delete("/post/", { data: { postId }})

        return { success: true }
    } catch (error) {
        console.error("Error deleting post: ", String(error))
        return { success: false }
    }
}