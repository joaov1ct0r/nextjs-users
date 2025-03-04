"use client"

import { useContext } from "react"
import { ForgetPasswordContext } from "@/app/forget-password/contexts/forget-password-context"

export function useForgetPasswordCtx() {
    const context = useContext(ForgetPasswordContext)

    if (context === undefined) throw new Error("needs a provider")

    return context
}