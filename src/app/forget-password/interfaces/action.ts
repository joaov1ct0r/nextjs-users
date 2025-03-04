export type Action = 
    | { type: "fetch_start" } 
    | { type: "fetch_success" } 
    | { type: "fetch_error"; error: string } 
    | { type: "fetch_reset" }