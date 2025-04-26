"use client";

import { State } from "@/app/feed/interfaces/state";
import {
  createContext,
  Dispatch,
  ReactNode,
  useReducer,
  useState,
} from "react";
import { Action } from "@/app/feed/interfaces/action";
import { Post } from "@/app/interfaces/post";
import { CreatePostFormSchema } from "@/app/feed/interfaces/create-post-form-schema";
import { feedReducer } from "@/app/feed/reducers/feed-reducer";
import { useApi } from "@/app/hooks/use-api";
import { getPosts } from "@/app/feed/api/get-posts";
import { createPost } from "@/app/feed/api/create-post";

const initialState: State = {
  error: null,
  loading: false,
  success: null,
  shouldOpenDeletePostModal: false,
  shouldOpenEditPostModal: false,
  showLoading: false,
};

const FeedContext = createContext<State | undefined>(undefined);
const FeedDispatchContext = createContext<
  | {
      dispatch: Dispatch<Action>;
      getPosts: () => Promise<Post[]>;
      createPost: (post: CreatePostFormSchema) => void;
    }
  | undefined
>(undefined);

interface FeedProviderProps {
  children: ReactNode;
}

export function FeedProvider({ children }: FeedProviderProps) {
  const [shouldOpenDeletePostModal, setShouldOpenDeletePostModal] =
    useState<boolean>(false);

  const [shouldOpenEditPostModal, setShouldOpenEditPostModal] =
    useState<boolean>(false);

  const [showLoading, setShowLoading] = useState<boolean>(false);

  const [state, dispatch] = useReducer(feedReducer, initialState);
  state.shouldOpenDeletePostModal = shouldOpenDeletePostModal;
  state.shouldOpenEditPostModal = shouldOpenEditPostModal;
  state.showLoading = showLoading;

  const api = useApi();

  const handleSetShouldOpenDeletePostModal = () =>
    setShouldOpenDeletePostModal(!shouldOpenDeletePostModal);

  const handleSetShouldOpenEditPostModal = () =>
    setShouldOpenEditPostModal(!shouldOpenEditPostModal);

  const handleGetPosts = async () => {
    dispatch({ type: "fetch_start" });
    setShowLoading(true);

    try {
      const { posts } = await getPosts(api);
      dispatch({ type: "fetch_success" });

      return posts;
    } catch (error) {
      console.error(error);
      dispatch({ type: "fetch_error", error: "Failed to get posts" });
      return [];
    } finally {
      setShowLoading(false);
    }
  };

  const handleCreatePost = async (post: CreatePostFormSchema) => {
    dispatch({ type: "fetch_start" });
    setShowLoading(true);

    try {
      await createPost(api, post);

      dispatch({ type: "fetch_success" });
      await handleGetPosts();
    } catch (error) {
      console.error(error);
      dispatch({ type: "fetch_error", error: "Failed to create post" });
    } finally {
      setShowLoading(false);
    }
  };

  return (
    <FeedContext.Provider value={state}>
      <FeedDispatchContext.Provider
        value={{
          createPost: handleCreatePost,
          getPosts: handleGetPosts,
          dispatch: dispatch,
        }}
      >
        {children}
      </FeedDispatchContext.Provider>
    </FeedContext.Provider>
  );
}

export { FeedContext, FeedDispatchContext };
