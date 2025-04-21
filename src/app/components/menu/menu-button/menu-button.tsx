import { ButtonHTMLAttributes, ReactNode } from "react";

export interface MenuButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  icon: ReactNode;
}

export function MenuButton({ children, icon, ...rest }: MenuButtonProps) {
  return (
    <button
      className="
                bg-gradient-to-r from-[#ff80b5] to-[#9089fc]
                w-[75%]
                mt-2
                sm:py-2
                sm:px-2
                text-xl
                text-white
                font-bold
                rounded
                focus:outline-none
                focus:shadow-outline
            "
      type="button"
      {...rest}
    >
      <p>{icon}</p>
      <p>{children}</p>
    </button>
  );
}
