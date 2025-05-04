"use client";

import { useAboutCtx } from "@/app/about/hooks/use-about";
import { ButtonWrapper } from "@/app/components/button-wrapper/button-wrapper";
import { Post as PostImp } from "@/app/interfaces/post";
import Image from "next/image";
import { FaCalendar, FaEdit } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import { MdDeleteForever } from "react-icons/md";
import { useFeedDispatch } from "@/app/feed/hooks/use-feed-dispatch";
import { useFeedCtx } from "@/app/feed/hooks/use-feed";

export interface PostProps {
  post: PostImp;
}

export function Post({ post }: PostProps) {
  const { user } = useAboutCtx();
  const { shouldOpenEditPostModal } = useFeedCtx();
  const { setShouldOpenEditPostModal, deletePost } = useFeedDispatch();

  const handleOnDeletePost = async () => {
    await deletePost(post.id);
  };

  return (
    <div
      className="w-[50%] h-[20%] px-4 pt-3 pb-4 m-2 bg-white shadow-md rounded overflow-wrap"
      id={post.id}
    >
      <div
        className="text-gray-400 text-sm flex flex-row items-center"
        id="userInfo"
      >
        <Image
          alt="User profile image"
          src={(() => {
            if (post.userWhoCreated && post.userWhoCreated.photoUrl) {
              return post.userWhoCreated.photoUrl;
            }

            return "/images/default_avatar.png";
          })()}
          quality={100}
          width={30}
          height={50}
          crossOrigin="use-credentials"
        />
        <p id="name" className="px-1">
          {post.userWhoCreated.name}
        </p>
        <p id="username" className="px-2">
          @{post.userWhoCreated.username}
        </p>
      </div>

      <div
        className="flex flex-row justify-between text-gray-700 text-sm pt-2"
        id="dates"
      >
        <div
          className="flex flex-row justify-evenly items-center"
          id="createdAt_date"
        >
          <FaCalendar />
          <p id="createdAt">
            {post.createdAt.toLocaleString("pt-BR", {
              timeZone: "America/Sao_Paulo",
            })}
          </p>
        </div>

        <div
          className="flex flex-row justify-evenly items-center"
          id="updatedAt_date"
        >
          <RxUpdate />
          <p id="updatedAt">
            {post.updatedAt
              ? post.updatedAt.toLocaleString("pt-BR", {
                  timeZone: "America/Sao_Paulo",
                })
              : ""}
          </p>
        </div>
      </div>
      <div className="text-black text-xl mt-2" id="content">
        {post.content}
      </div>
      {post.userWhoCreatedId === user?.id && (
        <ButtonWrapper>
          <FaEdit
            color="black"
            size={20}
            onClick={setShouldOpenEditPostModal}
          />
          <MdDeleteForever color="red" size={20} onClick={handleOnDeletePost} />
        </ButtonWrapper>
      )}
      {shouldOpenEditPostModal && <p>Edit modal</p>}
    </div>
  );
}
