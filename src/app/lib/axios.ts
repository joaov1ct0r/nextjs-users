import axios from "axios";
import { toast } from "react-toastify";
import { clearCookies } from "@/app/utils/cookies";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.crud.shop";
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    toast.success(response.data.message);

    return response;
  },
  async (error) => {
    if (error?.response?.status === 401) {
      toast.error("Unauthorized");
    }

    if (error?.response?.status === 403) {
      toast.error("Forbidden");
    }

    if (error?.response?.data?.message) {
      toast.error(error.response.data.message);
    }

    await clearCookies();
    return error;
  },
);

export { api };
