import { z } from "zod"
import { CreatePostSchema } from "@/app/feed/schemas/create-post-schema"

export type CreatePostFormSchema = z.infer<typeof CreatePostSchema>