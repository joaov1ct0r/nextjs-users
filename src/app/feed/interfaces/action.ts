import { Post } from "@/app/interfaces/post";

export type Action =
    | { type: "fetch_start" }
    | { type: "fetch_success", posts: Post[] }
    | { type: "fetch_error", error: string }
    | { type: "fetch_reset" }
    | { type: "set_post", post: Post | null }