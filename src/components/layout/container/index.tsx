import cn from "@/lib/cn";
import { ElementType, ReactNode } from "react";

interface ContainerProp {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

export default function Container({ as: Component = "div", className, children }: ContainerProp) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-[1248px] px-[16px] pt-[24px] tablet:px-[24px] desktop:pt-[40px]",
        className,
      )}
    >
      {children}
    </Component>
  );
}
