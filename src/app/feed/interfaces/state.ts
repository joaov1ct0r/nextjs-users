export interface State {
    success: null | boolean;
    loading: boolean
    error: string | null
    shouldOpenDeletePostModal: boolean
    shouldOpenEditPostModal: boolean
    showLoading: boolean
}