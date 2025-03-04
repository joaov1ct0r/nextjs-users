"use client"

import { useForgetPasswordCtx } from "@/app/forget-password/hooks/use-forget-password-ctx";
import { useForgetPasswordDispatchCtx } from "@/app/forget-password/hooks/use-forget-password-dispatch";
import { ResetPasswordFormSchema } from "@/app/forget-password/interfaces/reset-password-form-schema";
import { ResetPasswordSchema } from "@/app/forget-password/schemas/reset-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getObjectErrors } from "@/app/utils/get-object-errors";
import { useRouter } from "next/navigation";

export function useForgetPassword() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordFormSchema>({
        resolver: zodResolver(ResetPasswordSchema),
    });
    const { showLoading } = useForgetPasswordCtx();
    const { resetPassword } = useForgetPasswordDispatchCtx();
    
    const handleFormSubmit = (data: ResetPasswordFormSchema) => {
        const { success } = ResetPasswordSchema.safeParse(data);
    
        if (success) {
          resetPassword(data);
        }
    };

    const handleOnCancelForgetPassword = () => {
        router.push("/")
    };

    return {
        register,
        handleSubmit,
        errors,
        showLoading,
        resetPassword,
        handleFormSubmit,
        handleOnCancelForgetPassword,
        getObjectErrors,
    }
}