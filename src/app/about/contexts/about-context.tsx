"use client";

import { createContext, useReducer, ReactNode, Dispatch } from "react";
import { User } from "@/app/about/interfaces/user";
import { Action } from "@/app/about/interfaces/action";
import { State } from "@/app/about/interfaces/state";
import { useApi } from "@/app/hooks/use-api";
import { setCookie, getCookie } from "@/app/utils/cookies";

interface UserData {
  name: string;
  username: string;
  email: string;
  id: string;
  password: string | undefined;
}

const initialState: State = {
  success: null,
  loading: false,
  error: null,
  user: null,
};

function aboutReducer(state: State, action: Action): State {
  switch (action.type) {
    case "fetch_start":
      return { ...state, loading: true, error: null, success: null };
    case "fetch_success":
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        user: action.user,
      };
    case "fetch_error":
      return { ...state, loading: false, error: action.error, success: false };
    default:
      throw new Error("Unknown action type");
  }
}

const AboutContext = createContext<State | undefined>(undefined);
const AboutDispatchContext = createContext<
  | {
      dispatch: Dispatch<Action>;
      updateUser: (user: User) => void;
      getUser: () => void;
    }
  | undefined
>(undefined);

interface AboutProviderProps {
  children: ReactNode;
}

interface IGetUserData {
  email: string | undefined;
  username: string | undefined;
  name: string | undefined;
}

export function AboutProvider({ children }: AboutProviderProps) {
  const [state, dispatch] = useReducer(aboutReducer, initialState);
  const api = useApi();

  const handleGetUser = async () => {
    dispatch({ type: "fetch_start" });

    let user: IGetUserData | null = null;
    const userCookie = await getCookie({ name: "userObj" });

    if (userCookie !== undefined) user = JSON.parse(userCookie.value);

    const params = new URLSearchParams();

    if (user?.name) params.set("name", user.name);
    if (user?.email) params.set("email", user.email);
    if (user?.username) params.set("username", user.username);

    const urlParams = params.toString();

    try {
      const response = await api.get(`/user/?${urlParams}`);

      if (response?.status === 200) {
        const user = response.data.resource[0];

        dispatch({ type: "fetch_success", user });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: "fetch_error", error: "Failed to get user" });
    }
  };

  const handleUpdateUser = async (user: User) => {
    dispatch({ type: "fetch_start" });

    const data: UserData = {
      name: user.name,
      username: user.username,
      email: user.email,
      id: user.id,
      password: undefined,
    };

    if (user.password) {
      data.password = user.password;
    }

    try {
      const response = await api.put("/user/", data);

      if (response?.status === 204) {
        const updatedUser = response.data.resource;

        setCookie({
          user: JSON.stringify(updatedUser),
        });
        dispatch({ type: "fetch_success", user: updatedUser });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: "fetch_error", error: "Failed to update user" });
    }
  };

  return (
    <AboutContext.Provider value={state}>
      <AboutDispatchContext.Provider
        value={{
          dispatch,
          updateUser: handleUpdateUser,
          getUser: handleGetUser,
        }}
      >
        {children}
      </AboutDispatchContext.Provider>
    </AboutContext.Provider>
  );
}

export { AboutContext, AboutDispatchContext };
