import { State } from "@/app/signin/interfaces/state"
import { Action } from "@/app/signin/interfaces/action"

export default function signInReducer(state: State, action: Action): State {
    switch (action.type) {
        case "fetch_start":
            return { ...state, loading: true, error: null, success: null };
        case "fetch_success":
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                authenticated: true,
            };
        case "fetch_error":
            return {
                ...state,
                loading: false,
                error: action.error,
                success: false,
                authenticated: false,
            };
        case "fetch_reset":
            return {
                ...state,
                loading: false,
                success: null,
                error: null,
                authenticated: false,
                showLoading: false,
            };
        default:
            throw new Error("Unknown action type");
    }
}