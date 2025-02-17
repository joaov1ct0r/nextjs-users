import State from "@/app/signup/interfaces/state"
import { Action } from "@/app/signup/interfaces/action"

export function signUpReducer(state: State, action: Action): State {
    switch (action.type) {
        case "fetch_start":
            return { ...state, loading: true, error: null, success: null };
        case "fetch_success":
            return { ...state, loading: false, success: true, error: null };
        case "fetch_error":
            return { ...state, loading: false, error: action.error, success: false };
        default:
            throw new Error("Unknown action type");
    }
}