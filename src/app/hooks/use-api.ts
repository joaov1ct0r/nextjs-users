import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "@/app/lib/axios";
import { clearCookies } from "@/app/utils/cookies";

export const useApi = () => {
  const router = useRouter();

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => {
        if (response.data.message) {
          toast.success(response.data.message);
          return response;
        }

        toast.success("Success");
        return response;
      },
      async (error) => {
        if (error?.response?.status === 401) {
          toast.error("Unauthorized");
          return;
        }

        if (error?.response?.status === 403) {
          toast.error("Forbidden");
          await clearCookies();
          router.push("/");
          return;
        }

        if (error?.response?.data?.message) {
          toast.error(error.response.data.message);
          return;
        }

        toast.error("Failed");
        return Promise.reject(error);
      },
    );

    return () => api.interceptors.response.eject(interceptor);
  }, [router]);

  return api;
};
