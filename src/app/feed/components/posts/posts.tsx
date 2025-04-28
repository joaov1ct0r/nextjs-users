import { Post as PostImp } from "@/app/interfaces/post";
import { Post } from "../post/post";

export interface PostsProps {
  posts: PostImp[];
}

export function Posts({ posts }: PostsProps) {
  return (
    <div className="size-full flex flex-col items-center">
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
}
