import { Post } from "@/app/interfaces/post";

export interface State {
    success: null | boolean;
    loading: boolean
    error: string | null
    shouldOpenEditPostModal: boolean
    showLoading: boolean
    posts: Post[]
}