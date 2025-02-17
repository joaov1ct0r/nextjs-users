import { z } from "zod"
import { AboutSchema } from "@/app/about/schemas/about-schema"

export type AboutFormSchema = z.infer<typeof AboutSchema>