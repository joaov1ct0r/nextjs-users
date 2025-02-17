import { AxiosInstance } from "axios";

export interface GetUserParams {
    name: string | undefined
    email: string | undefined
    username: string | undefined
}

export async function getUser(api: AxiosInstance, opts: GetUserParams) {
    try {
        const params = new URLSearchParams();

        if (opts.name) params.set("name", opts.name);
        if (opts.email) params.set("email", opts.email);
        if (opts.username) params.set("username", opts.username);

        const urlParams = params.toString();

        const response = await api.get(`/user/?${urlParams}`);

        const user = response.data.resource[0];

        return { user, success: true }
    } catch (error) {
        throw new Error('Failed to get user ' + String(error))
    }
}