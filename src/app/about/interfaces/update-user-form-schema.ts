import { z } from "zod"
import { UpdateUserSchema } from "@/app/about/schemas/update-user-schema"

export type UpdateUserFormSchema = z.infer<typeof UpdateUserSchema>