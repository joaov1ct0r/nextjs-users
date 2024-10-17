import { User } from "@/app/about/interfaces/user";

export interface State {
  success: null | boolean;
  loading: boolean;
  error: string | null;
  user: User | null;
}
