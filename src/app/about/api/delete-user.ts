import { AxiosInstance } from "axios";

export async function deleteUser(api: AxiosInstance, userId: string) {
    try {
        await api.delete("/user/", { data: { userId } })
        await api.get("/signout/")

        return { success: true }
    } catch (error) {
        console.error('Failed to delete user ' + String(error))
    }

}