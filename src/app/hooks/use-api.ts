import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "@/app/lib/axios";
import { clearCookies } from "@/app/utils/cookies";

export const useApi = () => {
  const router = useRouter();

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      async (response) => {
        if (
          response.data.message &&
          response.config.method?.toUpperCase() !== "OPTIONS"
        ) {
          toast.success(response.data.message);
          return Promise.resolve(response);
        }

        toast.success("Success");
        return Promise.resolve(response);
      },
      async (error) => {
        if (error?.response?.status === 401) {
          toast.error("Unauthorized");
          return Promise.reject(error);
        }

        if (error?.response?.status === 403) {
          toast.error("Forbidden");
          await clearCookies();
          router.push("/");
          return Promise.reject(error);
        }

        if (error?.response?.data?.message) {
          toast.error(error.response.data.message);
          return Promise.reject(error);
        }

        toast.error("Failed");
        return Promise.reject(error);
      },
    );

    return () => api.interceptors.response.eject(interceptor);
  }, [router]);

  return api;
};
