import { z } from "zod"

const AboutSchema = z.object({
    id: z.coerce.string().min(1, "Field 'id' is required"),
    name: z.coerce.string().min(1, "Field 'name' is required"),
    email: z.coerce.string().email("Field 'email' is invalid").min(1, "Field 'email' is required"),
    username: z.coerce.string().min(1, "Field 'username' is required")
})

export { AboutSchema }