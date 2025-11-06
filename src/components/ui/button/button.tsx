import cn from "@/lib/cn";
import { ElementType, ReactNode, ComponentPropsWithoutRef } from "react";
import buttonStyle from "./button.styles";

type ButtonProps<T extends ElementType = "button"> = {
  as?: T;
  size?: "sm" | "md" | "lg";
  shape?: "basic" | "round";
  intent?: "primary" | "secondary" | "tertiary" | "danger";
  full?: boolean;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

export default function Button<T extends ElementType = "button">({
  as,
  size = "lg",
  shape = "basic",
  intent = "primary",
  full = false,
  disabled = false,
  className,
  children,
  ...props
}: ButtonProps<T>) {
  const Component = as || "button";
  const isButton = Component === "button";

  return (
    <Component
      disabled={isButton ? disabled : undefined}
      aria-disabled={!isButton && disabled ? true : undefined}
      className={cn(buttonStyle({ size, shape, intent, full, disabled }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
