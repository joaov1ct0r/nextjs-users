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
        text-white 
        font-bold
        ml-2
        py-2
        px-2
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
