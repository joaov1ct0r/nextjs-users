import { AxiosInstance } from "axios";

export async function resetPassword(api: AxiosInstance, email: string) {
    try {
        await api.put("/reset_password/", { email })
    } catch (error) {
        console.error('Failed to reset user password ' + String(error))
    }
}