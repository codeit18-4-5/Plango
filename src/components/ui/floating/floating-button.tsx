import cn from "@/lib/cn";
import { ReactNode } from "react";
import { backgroundButton } from "../button/button.styles";

type FloatingButtonProps = {
  className?: string;
  children?: ReactNode;
};

export default function FloatingButton({ children }: FloatingButtonProps) {
  return (
    <button
      type="button"
      className={cn(backgroundButton, "h-14 w-14 rounded-full")}
      aria-label="floating menu"
    >
      {children}
    </button>
  );
}
