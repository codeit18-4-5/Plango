import cn from "@/lib/cn";
import { ReactNode } from "react";

type FloatingProps = {
  className?: string;
  children?: ReactNode;
};

export default function Floating({ className, children }: FloatingProps) {
  return (
    <div
      className={cn(
        "floating-wrapper flex flex-col items-end gap-3",
        "fixed bottom-6 right-6 tablet:bottom-10 tablet:right-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
