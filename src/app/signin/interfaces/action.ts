import User from "@/app/interfaces/user";

export type Action =
  | { type: "fetch_start" }
  | { type: "fetch_success"; user: User }
  | { type: "fetch_error"; error: string }
  | {
      type: "fetch_reset";
      user: null;
      error: null;
      success: null;
      loading: boolean;
    };
