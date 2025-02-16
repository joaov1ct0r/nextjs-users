import { z } from "zod"

const SignInSchema = z.object({
    username: z.coerce.string().min(1, "Field: 'username' is required"),
    password: z.coerce.string().min(1, "Field: 'password' is required")
})

export { SignInSchema }