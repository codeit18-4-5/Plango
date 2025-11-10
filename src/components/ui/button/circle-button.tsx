"use client";
import cn from "@/lib/cn";
import { ElementType, ReactNode, ComponentPropsWithoutRef } from "react";
import { backgroundButton } from "./button.styles";

type CircleButtonProps<T extends ElementType = "button"> = {
  as?: T;
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

export default function CircleButton<T extends ElementType = "button">({
  as,
  className,
  children,
  ...props
}: CircleButtonProps<T>) {
  const Component = as || "button";

  return (
    <Component
      className={cn(
        backgroundButton,
        "flex h-14 w-14 items-center justify-center rounded-full",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
