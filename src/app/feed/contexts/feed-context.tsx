"use client";

import { State } from "@/app/feed/interfaces/state";
import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { Action } from "@/app/feed/interfaces/action";
import { CreatePostFormSchema } from "@/app/feed/interfaces/create-post-form-schema";
import { feedReducer } from "@/app/feed/reducers/feed-reducer";
import { useApi } from "@/app/hooks/use-api";
import { getPosts } from "@/app/feed/api/get-posts";
import { createPost } from "@/app/feed/api/create-post";
import { deletePost } from "../api/delete-post";
import { Post } from "@/app/interfaces/post";
import { UpdatePostFormSchema } from "@/app/feed/interfaces/update-post-form-schema";
import { updatePost } from "@/app/feed/api/update-post";

const initialState: State = {
  error: null,
  loading: false,
  success: null,
  shouldOpenEditPostModal: false,
  shouldOpenDeletePostModal: false,
  showLoading: false,
  posts: [],
  post: null,
  nextPage: 1,
};

const FeedContext = createContext<State | undefined>(undefined);
const FeedDispatchContext = createContext<
  | {
      dispatch: Dispatch<Action>;
      getPosts: () => Promise<void>;
      createPost: (post: CreatePostFormSchema) => Promise<void>;
      deletePost: (postId: string) => Promise<void>;
      setShouldOpenEditPostModal: () => void;
      setShouldOpenDeletePostModal: () => void;
      setPost: (post: Post | null) => void;
      updatePost: (post: UpdatePostFormSchema) => Promise<void>;
    }
  | undefined
>(undefined);

interface FeedProviderProps {
  children: ReactNode;
}

export function FeedProvider({ children }: FeedProviderProps) {
  const [state, dispatch] = useReducer(feedReducer, initialState);

  const api = useApi();

  const handleSetShouldOpenEditPostModal = () => {
    dispatch({ type: "set_should_open_edit_post_modal" });
  };

  const handleSetShouldOpenDeletePostModal = () => {
    dispatch({
      type: "set_should_open_delete_post_modal",
    });
  };

  async function handleGetPosts() {
    dispatch({ type: "fetch_start" });

    try {
      const { posts, nextPage } = await getPosts(api, state.nextPage);

      posts.map((post) => {
        post.createdAt = new Date(post.createdAt);
        if (post.updatedAt !== null) post.updatedAt = new Date(post.updatedAt);
      });

      dispatch({ type: "fetch_posts_success", posts, nextPage });
    } catch (error) {
      console.error(error);
      dispatch({ type: "fetch_error", error: "Failed to get posts" });
    }
  }

  async function handleCreatePost(post: CreatePostFormSchema) {
    dispatch({ type: "fetch_start" });

    try {
      await createPost(api, post);

      dispatch({ type: "fetch_success", posts: [], nextPage: 1 });
      await handleGetPosts();
    } catch (error) {
      console.error(error);
      dispatch({ type: "fetch_error", error: "Failed to create post" });
    }
  }

  async function handleDeletePost(postId: string) {
    dispatch({ type: "fetch_start" });

    try {
      const { success } = await deletePost(api, String(postId));

      if (success) {
        dispatch({ type: "fetch_success", posts: [], nextPage: 1 });
        await handleGetPosts();
      }
    } catch (error) {
      console.error("Error deleting post: ", String(error));
      dispatch({ type: "fetch_error", error: "Failed to delete post" });
    }
  }

  async function handleUpdatePost(post: UpdatePostFormSchema) {
    dispatch({ type: "fetch_start" });

    try {
      await updatePost(api, post);

      dispatch({ type: "fetch_success", posts: [], nextPage: 1 });
      await handleGetPosts();
    } catch (error) {
      console.error("Failed to update post: ", String(error));
      dispatch({ type: "fetch_error", error: "Failed to update post" });
    }
  }

  function handleSetPost(post: Post | null) {
    dispatch({ type: "set_post", post });
  }

  return (
    <FeedContext.Provider value={state}>
      <FeedDispatchContext.Provider
        value={{
          createPost: handleCreatePost,
          getPosts: handleGetPosts,
          deletePost: handleDeletePost,
          dispatch: dispatch,
          setShouldOpenEditPostModal: handleSetShouldOpenEditPostModal,
          setShouldOpenDeletePostModal: handleSetShouldOpenDeletePostModal,
          setPost: handleSetPost,
          updatePost: handleUpdatePost,
        }}
      >
        {children}
      </FeedDispatchContext.Provider>
    </FeedContext.Provider>
  );
}

export { FeedContext, FeedDispatchContext };
