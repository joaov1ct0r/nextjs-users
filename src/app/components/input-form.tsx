import React, { ChangeEvent, InputHTMLAttributes } from "react";

export interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputForm({
  placeholder,
  type,
  id,
  handleOnChange,
  name,
  ...rest
}: InputFormProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {placeholder}
      </label>

      <input
        {...rest}
        onChange={handleOnChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        type={type}
        placeholder={type === "password" ? "********" : placeholder}
        name={name}
      />
    </div>
  );
}
