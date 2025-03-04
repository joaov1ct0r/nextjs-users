import { useSignInCtx } from "@/app/signin/hooks/use-sign-in";
import { useSignInDispatch } from "@/app/signin/hooks/use-sign-in-dispatch";
import { ResetPasswordFormSchema } from "@/app/signin/interfaces/reset-password-form-schema";
import { ResetPasswordSchema } from "@/app/signin/schemas/reset-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MouseEvent } from "react"
import { getObjectErrors } from "@/app/utils/get-object-errors";

export function useForgetPasswordModal() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordFormSchema>({
        resolver: zodResolver(ResetPasswordSchema),
    });
    const { shouldOpenForgetPasswordModal, showLoading } = useSignInCtx();
    const { setOpenForgetPasswordModal, resetPassword } = useSignInDispatch();
    
    const handleFormSubmit = (data: ResetPasswordFormSchema) => {
        const { success } = ResetPasswordSchema.safeParse(data);
    
        if (success) {
          resetPassword(data);
          setOpenForgetPasswordModal();
        }
    };
    
    const handleOnCancelForgetPassword = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpenForgetPasswordModal();
    };

    return {
        register,
        handleSubmit,
        errors,
        shouldOpenForgetPasswordModal,
        showLoading,
        setOpenForgetPasswordModal,
        resetPassword,
        handleFormSubmit,
        handleOnCancelForgetPassword,
        getObjectErrors
    }
}