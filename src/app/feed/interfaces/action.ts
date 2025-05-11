import { Post } from "@/app/interfaces/post";

export type Action =
    | { type: "fetch_posts_success", posts: Post[], nextPage: number}
    | { type: "fetch_start" }
    | { type: "fetch_success", posts: Post[], nextPage: number }
    | { type: "fetch_error", error: string }
    | { type: "fetch_reset" }
    | { type: "set_post", post: Post | null }
    | { type: "set_should_open_delete_post_modal"}
    | { type: "set_should_open_edit_post_modal"}