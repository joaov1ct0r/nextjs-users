import { ResetPasswordSchema } from "@/app/forget-password/schemas/reset-password-schema"
import { z } from "zod"

export type ResetPasswordFormSchema = z.infer<typeof ResetPasswordSchema>