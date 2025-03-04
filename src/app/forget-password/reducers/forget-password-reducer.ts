import { State } from "@/app/forget-password/interfaces/state"
import { Action } from "@/app/forget-password/interfaces/action"

export function forgetPasswordReducer(state: State, action: Action): State {
    switch (action.type) {
        case "fetch_start":
            return { ...state, loading: true, error: null, success: null };
        case "fetch_success":
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
            };
        case "fetch_error":
            return {
                ...state,
                loading: false,
                error: action.error,
                success: false,
            };
        case "fetch_reset":
            return {
                ...state,
                loading: false,
                success: null,
                error: null,
                showLoading: false,
            };
        default:
            throw new Error("Unknown action type");
    }
}