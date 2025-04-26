import { Post } from "@/app/interfaces/post";
import { AxiosInstance } from "axios";

export interface GetPostParams {
    content: string | undefined
}

export interface GetPostResponse {
    posts: Post[]
    success: boolean
}

export async function getPosts(api: AxiosInstance): Promise<GetPostResponse> {
    try {
        const response = await api.get("/post/")

        const posts = response.data.resource

        return { posts, success: true }
    } catch(error) {
        console.error("Failed to get posts: ", error)
        return { success: false , posts: [] }
    }
}