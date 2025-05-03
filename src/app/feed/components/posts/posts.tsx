import { Post } from "@/app/feed/components/post/post";
import { useFeedCtx } from "@/app/feed/hooks/use-feed";
import { useFeedDispatch } from "@/app/feed/hooks/use-feed-dispatch";
import { useEffect } from "react";

export function Posts() {
  const { getPosts } = useFeedDispatch();
  const { posts, error, success, loading } = useFeedCtx();

  useEffect(() => {
    if (error === null && success === null && loading === false) {
      (async () => {
        await getPosts();
      })();
    }
  });

  return (
    <div className="size-full flex flex-col items-center">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
