import { z } from "zod";

const UpdatePostSchema = z.object({
    id: z.coerce.string().min(1, "Field: 'id' is required"),
    content: z.coerce.string().min(1, "Field 'content' is required")
})

export { UpdatePostSchema }