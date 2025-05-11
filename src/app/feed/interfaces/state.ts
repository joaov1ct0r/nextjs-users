import { Post } from "@/app/interfaces/post";

export interface State {
    success: null | boolean;
    loading: boolean
    error: string | null
    shouldOpenEditPostModal: boolean
    shouldOpenDeletePostModal: boolean
    showLoading: boolean
    posts: Post[]
    post: Post | null
    nextPage: number
}