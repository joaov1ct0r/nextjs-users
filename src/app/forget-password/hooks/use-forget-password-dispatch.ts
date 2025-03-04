"use client"

import { useContext } from "react"
import { ForgetPasswordDispatchContext } from "@/app/forget-password/contexts/forget-password-context"

export function useForgetPasswordDispatchCtx() {
    const context = useContext(ForgetPasswordDispatchContext)

    if (context === undefined) throw new Error("needs a provider")
    
    return context
}