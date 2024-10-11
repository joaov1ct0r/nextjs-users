import User from "@/app/interfaces/user";

export interface State {
  success: boolean | null;
  loading: boolean;
  error: string | null;
  user: User | null;
}
