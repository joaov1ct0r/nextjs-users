import React, { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: UseFormRegisterReturn
}

export default function InputForm({
  placeholder,
  type,
  id,
  name,
  label,
  register,
  hidden = false,
  ...rest
}: InputFormProps) {
  return (
    <div className="mb-2">
      <label hidden={hidden} className="block text-gray-700 text-sm font-bold">
        {label}
      </label>

      <input
        {...rest}
        {...register}
        hidden={hidden}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        type={type}
        placeholder={type === "password" ? "********" : placeholder}
        name={name}
      />
    </div>
  );
}
