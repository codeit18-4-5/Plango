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
      className={cn(backgroundButton, "h-10 w-10 rounded-full", "tablet:h-12 tablet:w-12")}
      aria-label="floating menu"
    >
      {children}
    </button>
  );
}
