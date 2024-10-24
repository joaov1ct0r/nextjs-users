import React, { ButtonHTMLAttributes, MouseEvent } from "react";
import Link from "next/link";

interface ButtonLinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  model: "danger" | "warning" | "success";
  placeholder: string;
  handleOnClick: (event: MouseEvent<HTMLButtonElement>) => void;
  href: string;
}

const buttonTypeClass = {
  danger: {
    color: "bg-red-500",
    hover: "hover:bg-red-700",
  },
  warning: {
    color: "bg-yellow-500",
    hover: "hover:bg-yellow-700",
  },
  success: {
    color: "bg-green-500",
    hover: "hover:bg-green-700",
  },
};

export default function ButtonForm({
  model,
  placeholder,
  type,
  href = "",
  handleOnClick,
  ...rest
}: ButtonLinkProps) {
  const color = buttonTypeClass[model];

  return (
    <button
      {...rest}
      onClick={handleOnClick}
      type={type}
      className={`
            ${color.color} 
            ${color.hover} 
            text-white 
            font-bold 
            py-2 
            px-4 
            rounded 
            focus:outline-none 
            focus:shadow-outline
          `}
    >
      <Link href={href}>{placeholder}</Link>
    </button>
  );
}
