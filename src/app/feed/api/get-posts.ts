import { Post } from "@/app/interfaces/post";
import { AxiosInstance } from "axios";

export interface GetPostParams {
    content: string | undefined
}

export interface GetPostResponse {
    posts: Post[]
    success: boolean
    nextPage: number
}

export async function getPosts(api: AxiosInstance, page: number): Promise<GetPostResponse> {
    try {
        const query = new URLSearchParams()

        if (page >= 2) query.append("page", String(page))

        const response = await api.get("/post/?" + query.toString())

        const { resource, nextPage } = response.data

        return { posts: resource, success: true, nextPage }
    } catch(error) {
        console.error("Failed to get posts: ", error)
        return { success: false , posts: [], nextPage: 1 }
    }
}