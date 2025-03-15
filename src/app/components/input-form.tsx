"use client";

import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
}

export function InputForm({
  id,
  register,
  hidden = false,
  type = "text",
  ...rest
}: InputFormProps) {
  return (
    <input
      hidden={hidden}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={id}
      type={type}
      {...register}
      {...rest}
    />
  );
}
