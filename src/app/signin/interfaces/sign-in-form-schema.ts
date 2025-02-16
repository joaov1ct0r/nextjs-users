import { z } from "zod"
import { SignInSchema } from "@/app/signin/schemas/sign-in-schema"

export type SignInFormSchema = z.infer<typeof SignInSchema>