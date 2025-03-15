"use client"

import { MouseEvent, useCallback } from "react"
import { useSignUpCtx } from "@/app/signup/hooks/use-sign-up"
import { useSignUpDispatch } from "@/app/signup/hooks/use-sign-up-dispatch"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpSchema } from "@/app/signup/schemas/sign-up-schema"
import { SignUpFormSchema } from "@/app/signup/interfaces/sign-up-form-schema";

export function useSignUpForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignUpFormSchema>({
        resolver: zodResolver(SignUpSchema),
    });

    const file = watch("file");

    const router = useRouter();

    const { error, success, showLoading } = useSignUpCtx();

    const { signUpUser } = useSignUpDispatch();

    const memoizedHandleAfterSignUp = useCallback(() => {
        router.push("/");
    }, [router]);

    const handleFormSubmit = (data: SignUpFormSchema) => {
        const { success } = SignUpSchema.safeParse(data);

        if (success) signUpUser(data);
    };

    const handleCancelSignUp = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        memoizedHandleAfterSignUp();
    };

    return {
        register,
        handleSubmit,
        file,
        handleCancelSignUp,
        handleFormSubmit,
        errors,
        showLoading,
        success,
        error,
        memoizedHandleAfterSignUp
    }
}