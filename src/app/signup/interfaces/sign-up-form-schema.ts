import { z } from "zod";
import { SignUpSchema } from "@/app/signup/schemas/sign-up-schema";

export type SignUpFormSchema = z.infer<typeof SignUpSchema>