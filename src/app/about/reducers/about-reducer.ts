import { State } from "@/app/about/interfaces/state"
import { Action } from "@/app/about/interfaces/action"

export function aboutReducer(state: State, action: Action): State {
    switch (action.type) {
        case "fetch_start":
            return { 
                ...state, 
                loading: true, 
                error: null, 
                success: null,
                showLoading: true
            };
        case "fetch_success":
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                user: action.user,
                showLoading: false
            };
        case "fetch_error":
            return { 
                ...state, 
                loading: false, 
                error: action.error, 
                success: false,
                showLoading: false
            };
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
        case "set_should_open_delete_account_modal":
            return {
                ...state,
                shouldOpenDeleteAccountModal: !state.shouldOpenDeleteAccountModal
            }
        case "set_should_open_edit_account_modal":
            return {
                ...state,
                shouldOpenUpdateUserModal: !state.shouldOpenUpdateUserModal
            }

        default:
            throw new Error("Unknown action type");
    }
}