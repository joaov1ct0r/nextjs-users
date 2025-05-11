"use client";

import React, { useEffect } from "react";
import { Feed } from "@/app/feed/components";
import { useFeedMind } from "@/app/feed/hooks/use-feed-mind";
import { getObjectErrors } from "@/app/utils/get-object-errors";
import { useAboutCtx } from "@/app/about/hooks/use-about";
import { useAboutDispatch } from "@/app/about/hooks/use-about-dispatch";
import { useFeedCtx } from "./hooks/use-feed";

export default function FeedPage() {
  const { handleSubmit, errors, handleFormSubmit, register, showLoading } =
    useFeedMind();
  const { shouldOpenEditPostModal, shouldOpenDeletePostModal } = useFeedCtx();
  const { error, loading, success } = useAboutCtx();
  const { getUser } = useAboutDispatch();

  useEffect(() => {
    if (error === null && loading === false && success === null) {
      (() => {
        getUser();
      })();
    }
  });

  useEffect(() => {
    if (errors) {
      getObjectErrors(errors);
    }
  }, [errors]);

  return (
    <Feed.Root>
      <Feed.Content>
        {shouldOpenEditPostModal && <Feed.UpdateForm />}
        {shouldOpenDeletePostModal && <Feed.DeleteForm />}
        <Feed.Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Feed.InputWrapper>
            <Feed.Label id="content">Express your mind</Feed.Label>
            <Feed.Input
              register={register("content", { required: true })}
              id="content"
            />
          </Feed.InputWrapper>
          <Feed.ButtonWrapper>
            <Feed.Button
              disabled={showLoading}
              model={showLoading ? "disabled" : "success"}
              type="submit"
            >
              Post
            </Feed.Button>
          </Feed.ButtonWrapper>
        </Feed.Form>
        <Feed.Posts />
      </Feed.Content>
    </Feed.Root>
  );
}
