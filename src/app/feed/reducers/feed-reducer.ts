import { State } from "@/app/feed/interfaces/state";
import { Action } from "@/app/feed/interfaces/action";

export function feedReducer(state: State, action: Action): State {
    switch(action.type) {
        case "fetch_posts_success":
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                posts: [...state.posts, ...action.posts],
                post: null,
                showLoading: false
            }
        case "fetch_start":
            return { 
                ...state, 
                loading: true, 
                error: null, 
                success: null, 
                showLoading: true 
            }
        case "fetch_success":
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                posts: action.posts,
                post: null,
                showLoading: false
            }
        case "fetch_error":
            return { ...state, loading: false, error: action.error, success: false, post: null, showLoading: false }
        case "fetch_reset":
            return {
                ...state,
                success: null,
                loading: false,
                error: null,
                shouldOpenEditPostModal: false,
                showLoading: false,
                post: null,
            }
        case "set_post":
            return {
                ...state,
                post: action.post
            }
        case "set_should_open_delete_post_modal":
            return {
                ...state,
                shouldOpenDeletePostModal: !state.shouldOpenDeletePostModal
            }
        case "set_should_open_edit_post_modal":
            return {
                ...state,
                shouldOpenEditPostModal: !state.shouldOpenEditPostModal
            }

        default:
            throw new Error("Unknown action type")
    }
}