import { AxiosInstance } from "axios";

export interface DeleteUserResponse {
    success: boolean
}

export async function deleteUser(api: AxiosInstance, userId: string): Promise<DeleteUserResponse> {
    try {
        await api.delete("/user/", { data: { userId } })
        await api.get("/signout/")

        return { success: true }
    } catch (error) {
        console.error('Failed to delete user ' + String(error))
        return { success: false }
    }

}