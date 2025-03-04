"use client"

import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { SignInSchema } from "@/app/signin/schemas/sign-in-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInFormSchema } from "@/app/signin/interfaces/sign-in-form-schema"
import { useRouter } from "next/navigation"
import { useSignInDispatch } from "@/app/signin/hooks/use-sign-in-dispatch"
import { getObjectErrors } from "@/app/utils/get-object-errors";
import { useSignInCtx } from "@/app/signin/hooks/use-sign-in"

export function useSignInForm() {
    const { signInUser } = useSignInDispatch()
    const { error, success, showLoading } = useSignInCtx()
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<SignInFormSchema>({
        resolver: zodResolver(SignInSchema),
      });
    
      const handleFormSubmit = (data: SignInFormSchema) => {
        const { success } = SignInSchema.safeParse(data);
    
        if (success) signInUser(data);
      };
    
      const handleSignUp = () => {
        router.push("/signup");
      };
    
      const memoizedHandleSignIn = useCallback(() => {
        router.push("/about");
      }, [router]);

      const memoizedHandleForgetPassword = useCallback(() => {
        router.push("/forget-password")
      }, [router])

      return { 
        register, 
        handleSubmit, 
        errors, 
        handleFormSubmit, 
        handleSignUp, 
        memoizedHandleSignIn,
        memoizedHandleForgetPassword,
        getObjectErrors,
        error,
        success,
        showLoading,
    }
}