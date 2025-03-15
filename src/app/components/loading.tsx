"use client";

import { useAboutCtx } from "@/app/about/hooks/use-about";
import { ButtonForm } from "@/app/components/button-form";

export default function Loading() {
  const { showLoading } = useAboutCtx();

  return (
    <div
      className={!showLoading ? "hidden" : "flex justify-center items-center"}
    >
      <ButtonForm model="warning" disabled={true}>
        Loading...
      </ButtonForm>
      <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24" />
    </div>
  );
}
