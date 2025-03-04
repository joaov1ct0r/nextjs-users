"use client";

import { DialogTitle } from "@headlessui/react";

export interface ForgetPasswordModalTitleProps {
  children: string;
}

export function ForgetPasswordModalTitle({
  children,
}: ForgetPasswordModalTitleProps) {
  return (
    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
      {children}
    </DialogTitle>
  );
}
