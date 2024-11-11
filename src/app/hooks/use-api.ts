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
          toast.success(response.data.message, { toastId: "success1" });
          return Promise.resolve(response);
        }

        toast.success("Success", { toastId: "success1" });
        return Promise.resolve(response);
      },
      async (error) => {
        if (error?.response?.status === 401) {
          toast.error("Unauthorized", { toastId: "error1" });
          return Promise.reject(error);
        }

        if (error?.response?.status === 403) {
          toast.error("Forbidden", { toastId: "error1" });
          await clearCookies();
          router.push("/");
          return Promise.reject(error);
        }

        if (error?.response?.data?.message) {
          toast.error(error.response.data.message, { toastId: "error1" });
          return Promise.reject(error);
        }

        toast.error("Failed", { toastId: "error1" });
        return Promise.reject(error);
      },
    );

    return () => api.interceptors.response.eject(interceptor);
  }, [router]);

  return api;
};
