import { Post } from "@/app/feed/components/post/post";
import { useFeedCtx } from "@/app/feed/hooks/use-feed";
import { useFeedDispatch } from "@/app/feed/hooks/use-feed-dispatch";
import { useCallback, useEffect } from "react";

export function Posts() {
  const { getPosts } = useFeedDispatch();
  const { posts, error, success, loading } = useFeedCtx();

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      (async () => {
        await getPosts();
      })();
    }
  }, [getPosts]);

  useEffect(() => {
    if (error === null && success === null && loading === false) {
      (async () => {
        await getPosts();
      })();
    }
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="size-full flex flex-col items-center">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
}
