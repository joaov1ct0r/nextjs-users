import { State } from "@/app/about/interfaces/state"
import { Action } from "@/app/about/interfaces/action"

export function aboutReducer(state: State, action: Action): State {
    switch (action.type) {
        case "fetch_start":
            return { ...state, loading: true, error: null, success: null };
        case "fetch_success":
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                user: action.user,
            };
        case "fetch_error":
            return { ...state, loading: false, error: action.error, success: false };
        case "fetch_reset":
            return {
                ...state,
                success: null,
                loading: false,
                error: null,
                user: null,
                shouldOpenDeleteAccountModal: false,
                shouldOpenUpdateUserModal: false,
                showLoading: false,
            };

        default:
            throw new Error("Unknown action type");
    }
}