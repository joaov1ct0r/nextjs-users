"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { About } from "@/app/about/components/index";
import { useFeedCtx } from "@/app/feed/hooks/use-feed";
import { useFeedDispatch } from "@/app/feed/hooks/use-feed-dispatch";

export function DeletePostModal() {
  const { showLoading, shouldOpenDeletePostModal, post } = useFeedCtx();
  const { deletePost, setPost, setShouldOpenDeletePostModal } =
    useFeedDispatch();

  const handleOnDeletePost = async () => {
    if (post === null) {
      console.error("Post não setado");
      setShouldOpenDeletePostModal();
      return;
    }

    await deletePost(post.id);
    setShouldOpenDeletePostModal();
  };

  const handleOnCancelDeletePost = () => {
    setPost(null);
    setShouldOpenDeletePostModal();
  };

  return (
    <Dialog
      open={shouldOpenDeletePostModal}
      onClose={() => {}}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-red-600"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    Delete Post
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete your post? This action
                      cannot be undone.
                    </p>
                  </div>
                </div>
                <About.ButtonWrapper>
                  <About.Button
                    disabled={showLoading}
                    model={showLoading ? "disabled" : "danger"}
                    onClick={handleOnDeletePost}
                  >
                    Delete
                  </About.Button>
                  <About.Button
                    disabled={showLoading}
                    model={showLoading ? "disabled" : "warning"}
                    onClick={handleOnCancelDeletePost}
                  >
                    Cancel
                  </About.Button>
                </About.ButtonWrapper>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
