import { User } from "@/app/about/interfaces/user";

export type Action =
  | { type: "fetch_start" }
  | { type: "fetch_success"; user: User | null }
  | { type: "fetch_error"; error: string }
  | { type: "fetch_reset" }
  | { type: "set_should_open_delete_account_modal" }
  | { type: "set_should_open_edit_account_modal" }
  | { type: "set_show_loading" }
