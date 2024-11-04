export interface State {
  authenticated: boolean;
  success: boolean | null;
  loading: boolean;
  error: string | null;
}
