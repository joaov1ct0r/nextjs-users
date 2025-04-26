import { z } from "zod"

const CreatePostSchema = z.object({
    content: z.coerce.string().min(1, "Field 'content' is required")
})

export { CreatePostSchema }