"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  useReducer,
  useState,
} from "react";
import { State } from "@/app/forget-password/interfaces/state";
import { Action } from "@/app/forget-password/interfaces/action";
import { ResetPasswordFormSchema } from "@/app/forget-password/interfaces/reset-password-form-schema";
import { useApi } from "@/app/hooks/use-api";
import { forgetPasswordReducer } from "@/app/forget-password/reducers/forget-password-reducer";
import { resetPassword } from "@/app/forget-password/api/reset-password";

const initialState: State = {
  success: null,
  error: null,
  loading: false,
  showLoading: false,
};

const ForgetPasswordContext = createContext<State | undefined>(undefined);
const ForgetPasswordDispatchContext = createContext<
  | {
      dispatch: Dispatch<Action>;
      resetPassword: (data: ResetPasswordFormSchema) => Promise<void>;
      setShowLoading: () => void;
    }
  | undefined
>(undefined);

export interface ForgetPasswordProviderProps {
  children: ReactNode;
}

export function ForgetPasswordProvider({
  children,
}: ForgetPasswordProviderProps) {
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const [state, dispatch] = useReducer(forgetPasswordReducer, initialState);
  state.showLoading = showLoading;

  const api = useApi();

  const handleSetShowLoading = () => setShowLoading(!showLoading);

  const handleResetPassword = async (data: ResetPasswordFormSchema) => {
    setShowLoading(true);
    dispatch({ type: "fetch_start" });

    try {
      resetPassword(api, data.email);
      dispatch({ type: "fetch_success" });
    } catch (error) {
      console.error(error);
      dispatch({ type: "fetch_error", error: "Failed to reset password" });
    } finally {
      setShowLoading(false);
    }
  };

  return (
    <ForgetPasswordContext.Provider value={state}>
      <ForgetPasswordDispatchContext.Provider
        value={{
          setShowLoading: handleSetShowLoading,
          resetPassword: handleResetPassword,
          dispatch,
        }}
      >
        {children}
      </ForgetPasswordDispatchContext.Provider>
    </ForgetPasswordContext.Provider>
  );
}

export { ForgetPasswordContext, ForgetPasswordDispatchContext };
