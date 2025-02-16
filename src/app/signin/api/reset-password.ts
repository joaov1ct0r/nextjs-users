import { AxiosInstance } from "axios";

export async function resetPassword(api: AxiosInstance, email: string) {
    try {
        await api.put("/reset_password", { email })
    } catch (error) {
        throw new Error('Failed to reset user password ' + String(error))
    }
}