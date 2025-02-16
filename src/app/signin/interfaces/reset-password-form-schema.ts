import { ResetPasswordSchema } from "@/app/signin/schemas/reset-password-schema"
import { z } from "zod"

export type ResetPasswordFormSchema = z.infer<typeof ResetPasswordSchema>