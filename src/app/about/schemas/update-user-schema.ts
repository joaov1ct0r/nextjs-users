import { z } from "zod"

const UpdateUserSchema = z.object({
    id: z.coerce.string().min(1, "Field: 'id' is required"),
    name: z.coerce.string().min(1, "Field: 'name' is required"),
    email: z.coerce.string().email("Field: 'email' is invalid").min(1, "Field: 'email' is required"),
    username: z.coerce.string().min(1, "Field: 'username' is required"),
    password: z.coerce.string().min(1, "Field 'password' is required").optional(),
    file: z.instanceof(FileList).nullable()
})

export { UpdateUserSchema }