"use client";

import {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useState,
} from "react";
import { User } from "@/app/about/interfaces/user";
import { Action } from "@/app/about/interfaces/action";
import { State } from "@/app/about/interfaces/state";
import { useApi } from "@/app/hooks/use-api";
import { setCookie, getCookie, clearCookies } from "@/app/utils/cookies";
import { useSignInDispatch } from "@/app/signin/hooks/use-sign-in-dispatch";

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
  shouldOpenDeleteAccountModal: false,
  shouldOpenUpdateUserModal: false,
  showLoading: false,
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
    case "fetch_reset":
      return {
        ...state,
        success: null,
        loading: false,
        error: null,
        user: null,
        shouldOpenDeleteAccountModal: false,
        shouldOpenUpdateUserModal: false,
        showLoading: false,
      };

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
      deleteUser: () => void;
      setOpenAccountModal: () => void;
      setOpenUpdateUserModal: () => void;
      setShowLoading: () => void;
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
  const [shouldOpenDeleteAccountModal, setShouldOpenDeleteAccountModal] =
    useState<boolean>(false);
  const [shouldOpenUpdateUserModal, setShouldOpenUpdateUserModal] =
    useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [state, dispatch] = useReducer(aboutReducer, initialState);
  state.shouldOpenDeleteAccountModal = shouldOpenDeleteAccountModal;
  state.shouldOpenUpdateUserModal = shouldOpenUpdateUserModal;
  state.showLoading = showLoading;
  const api = useApi();
  const { dispatch: signInDispatch } = useSignInDispatch();

  const handleSetShowLoading = () => setShowLoading(!showLoading);

  const handleSetShouldOpenDeleteAccountModal = () =>
    setShouldOpenDeleteAccountModal(!shouldOpenDeleteAccountModal);

  const handleSetShouldOpenUpdateUserModal = () =>
    setShouldOpenUpdateUserModal(!shouldOpenUpdateUserModal);

  const handleDeleteUser = async () => {
    dispatch({ type: "fetch_start" });
    setShowLoading(true);

    let user: User | null = null;
    const userCookie = await getCookie({ name: "userObj" });

    if (userCookie !== undefined) user = JSON.parse(userCookie.value);

    try {
      const response = await api.delete("/user/", {
        data: { userId: user?.id },
      });

      if (response?.status === 204) {
        await api.get("/signout/");
        await clearCookies();

        dispatch({ type: "fetch_reset" });
        signInDispatch({ type: "fetch_reset" });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: "fetch_error", error: "Failed to deactivate user" });
    } finally {
      setShowLoading(false);
    }
  };

  const handleGetUser = async () => {
    dispatch({ type: "fetch_start" });
    setShowLoading(true);

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
    } finally {
      setShowLoading(false);
    }
  };

  const handleUpdateUser = async (user: User) => {
    dispatch({ type: "fetch_start" });
    setShowLoading(true);

    let userObj: User | null = null;
    const userCookie = await getCookie({ name: "userObj" });

    if (userCookie !== undefined) userObj = JSON.parse(userCookie.value);
    if (userObj === null) return;

    const data: UserData = {
      id: userObj.id,
      name: user.name,
      username: user.username,
      email: user.email,
      password: undefined,
    };

    if (user.password) {
      data.password = user.password;
    }

    try {
      const response = await api.put("/user/", data);

      if (response?.status === 204) {
        const updatedUser: User = {
          id: userObj.id,
          name: data.name,
          username: data.username,
          email: data.email,
          password: String(data.password),
        };

        setCookie({ user: JSON.stringify(updatedUser) });
        dispatch({ type: "fetch_success", user: updatedUser });
        handleSetShouldOpenUpdateUserModal();
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: "fetch_error", error: "Failed to update user" });
    } finally {
      setShowLoading(false);
    }
  };

  return (
    <AboutContext.Provider value={state}>
      <AboutDispatchContext.Provider
        value={{
          dispatch,
          updateUser: handleUpdateUser,
          getUser: handleGetUser,
          deleteUser: handleDeleteUser,
          setOpenAccountModal: handleSetShouldOpenDeleteAccountModal,
          setOpenUpdateUserModal: handleSetShouldOpenUpdateUserModal,
          setShowLoading: handleSetShowLoading,
        }}
      >
        {children}
      </AboutDispatchContext.Provider>
    </AboutContext.Provider>
  );
}

export { AboutContext, AboutDispatchContext };
