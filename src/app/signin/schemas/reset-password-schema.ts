import { z } from "zod"

const ResetPasswordSchema = z.object({
    email: z.coerce.string().min(1, "Field: 'email' is required").email("Field 'email' is not valid")
})

export { ResetPasswordSchema }