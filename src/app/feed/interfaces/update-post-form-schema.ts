import { z } from "zod";
import { UpdatePostSchema } from "../schemas/update-post-schema";

export type UpdatePostFormSchema = z.infer<typeof UpdatePostSchema>