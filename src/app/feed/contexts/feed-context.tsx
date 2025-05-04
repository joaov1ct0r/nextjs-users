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
import { CreatePostFormSchema } from "@/app/feed/interfaces/create-post-form-schema";
import { feedReducer } from "@/app/feed/reducers/feed-reducer";
import { useApi } from "@/app/hooks/use-api";
import { getPosts } from "@/app/feed/api/get-posts";
import { createPost } from "@/app/feed/api/create-post";
import { deletePost } from "../api/delete-post";

const initialState: State = {
  error: null,
  loading: false,
  success: null,
  shouldOpenEditPostModal: false,
  showLoading: false,
  posts: [],
};

const FeedContext = createContext<State | undefined>(undefined);
const FeedDispatchContext = createContext<
  | {
      dispatch: Dispatch<Action>;
      getPosts: () => Promise<void>;
      createPost: (post: CreatePostFormSchema) => Promise<void>;
      deletePost: (postId: string) => Promise<void>;
      setShouldOpenEditPostModal: () => void;
    }
  | undefined
>(undefined);

interface FeedProviderProps {
  children: ReactNode;
}

export function FeedProvider({ children }: FeedProviderProps) {
  const [shouldOpenEditPostModal, setShouldOpenEditPostModal] =
    useState<boolean>(false);

  const [showLoading, setShowLoading] = useState<boolean>(false);

  const [state, dispatch] = useReducer(feedReducer, initialState);
  state.shouldOpenEditPostModal = shouldOpenEditPostModal;
  state.showLoading = showLoading;

  const api = useApi();

  const handleSetShouldOpenEditPostModal = () =>
    setShouldOpenEditPostModal(!shouldOpenEditPostModal);

  const handleGetPosts = async () => {
    dispatch({ type: "fetch_start" });
    setShowLoading(true);

    try {
      const { posts } = await getPosts(api);

      posts.map((post) => {
        post.createdAt = new Date(post.createdAt);
        if (post.updatedAt !== null) post.updatedAt = new Date(post.updatedAt);
      });

      dispatch({ type: "fetch_success", posts });
    } catch (error) {
      console.error(error);
      dispatch({ type: "fetch_error", error: "Failed to get posts" });
    } finally {
      setShowLoading(false);
    }
  };

  const handleCreatePost = async (post: CreatePostFormSchema) => {
    dispatch({ type: "fetch_start" });
    setShowLoading(true);

    try {
      await createPost(api, post);
      const { posts } = await getPosts(api);

      dispatch({ type: "fetch_success", posts });
      await handleGetPosts();
    } catch (error) {
      console.error(error);
      dispatch({ type: "fetch_error", error: "Failed to create post" });
    } finally {
      setShowLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    console.log("context postId: ", postId);
    dispatch({ type: "fetch_start" });
    setShowLoading(true);

    try {
      const { success } = await deletePost(api, String(postId));

      if (success) {
        const { posts } = await getPosts(api);
        dispatch({ type: "fetch_success", posts });

        await handleGetPosts();
      }
    } catch (error) {
      console.error("Error deleting post: ", String(error));
      dispatch({ type: "fetch_error", error: "Failed to delete post" });
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
          deletePost: handleDeletePost,
          dispatch: dispatch,
          setShouldOpenEditPostModal: handleSetShouldOpenEditPostModal,
        }}
      >
        {children}
      </FeedDispatchContext.Provider>
    </FeedContext.Provider>
  );
}

export { FeedContext, FeedDispatchContext };
