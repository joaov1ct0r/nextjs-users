export type Action =
  | { type: "fetch_start" }
  | { type: "fetch_success"; authenticated: boolean }
  | { type: "fetch_error"; error: string; authenticated: boolean }
  | {
      type: "fetch_reset";
      authenticated: boolean;
      error: null;
      success: null;
      loading: boolean;
    };
