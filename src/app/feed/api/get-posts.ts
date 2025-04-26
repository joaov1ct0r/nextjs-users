import { Post } from "@/app/about/interfaces/post";
import { AxiosInstance } from "axios";

export interface GetPostParams {
    content: string | undefined
}

export interface GetPostResponse {
    posts: Post[]
    success: boolean
}

export async function getPosts(api: AxiosInstance, opts: GetPostParams): Promise<GetPostResponse> {
    try {
        const params = new URLSearchParams()

        if (opts.content) params.set("content", opts.content)

        const urlParams = params.toString

        const response = await api.get(`/post/?${urlParams}`)

        const posts = response.data.resource

        return { posts, success: true }
    } catch(error) {
        console.error("Failed to get posts: ", error)
        return { success: false , posts: [] }
    }
}