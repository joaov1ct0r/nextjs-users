import React, { ChangeEvent, InputHTMLAttributes } from "react";

export interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export default function InputForm({
  placeholder,
  type,
  id,
  handleOnChange,
  name,
  label,
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
        hidden={hidden}
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
