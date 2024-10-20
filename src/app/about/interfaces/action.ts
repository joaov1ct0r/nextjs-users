import { User } from "@/app/about/interfaces/user";

export type Action =
  | { type: "fetch_start" }
  | { type: "fetch_success"; user: User | null }
  | { type: "fetch_error"; error: string };
