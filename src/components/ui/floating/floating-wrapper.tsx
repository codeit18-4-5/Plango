import cn from "@/lib/cn";
import { ReactNode } from "react";

type FloatingWrapperProps = {
  className?: string;
  children?: ReactNode;
};

export default function FloatingWrapper({ children }: FloatingWrapperProps) {
  return (
    <div
      className={cn(
        "floating-wrapper flex flex-col items-end gap-4",
        "fixed bottom-6 right-6 tablet:bottom-10 tablet:right-10",
      )}
    >
      {children}
    </div>
  );
}
