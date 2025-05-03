"use client";

import React, { useEffect } from "react";
import { Feed } from "@/app/feed/components";
import { useFeedMind } from "./hooks/use-feed-mind";
import { getObjectErrors } from "@/app/utils/get-object-errors";

export default function FeedPage() {
  const { handleSubmit, errors, handleFormSubmit, register, showLoading } =
    useFeedMind();

  useEffect(() => {
    if (errors) {
      getObjectErrors(errors);
    }
  }, [errors]);

  return (
    <Feed.Root>
      <Feed.Content>
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
