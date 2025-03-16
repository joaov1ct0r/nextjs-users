import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  model: "danger" | "warning" | "success" | "disabled";
  children: string;
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
  disabled: {
    color: "bg-gray-500",
    hover: "hover: bg-gray-700",
  },
};

export function ButtonForm({
  model,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  const color = buttonTypeClass[model];

  return (
    <button
      type={type}
      className={`
        ${color.color} 
        ${color.hover}
        w-1/2
        mb-1
        sm:w-1/4
        sm:h-1/4
        sm:ml-2
        sm:py-2
        sm:px-2
        text-white 
        font-bold
        rounded 
        focus:outline-none 
        focus:shadow-outline
      `}
      {...rest}
    >
      {children}
    </button>
  );
}
