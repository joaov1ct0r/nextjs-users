import { State } from "@/app/feed/interfaces/state";
import { Action } from "@/app/feed/interfaces/action";

export function feedReducer(state: State, action: Action): State {
    switch(action.type) {
        case "fetch_start":
            return { ...state, loading: true, error: null, success: null }
        case "fetch_success":
            return {
                ...state,
                loading: false,
                success: true,
                error: null
            }
        case "fetch_error":
            return { ...state, loading: false, error: action.error, success: false }
        case "fetch_reset":
            return {
                ...state,
                success: null,
                loading: false,
                error: null,
                shouldOpenDeletePostModal: false,
                shouldOpenEditPostModal: false,
                showLoading: false
            }

        default:
            throw new Error("Unknown action type")
    }
}