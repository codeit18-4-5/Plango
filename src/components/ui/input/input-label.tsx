"use client";
import cn from "@/lib/cn";
import { ReactNode, useContext } from "react";
import { inputLabelStyle } from "./input.style";
import { InputContext } from "./input.context";

type InputLabelProps = {
  label?: string;
  caption?: string;
  size?: "sm" | "md";
  hidden?: boolean;
  required?: boolean;
  className?: string;
  children?: ReactNode;
};

export default function InputLabel({
  label,
  caption,
  size = "sm",
  hidden = false,
  required = false,
  className,
  children,
}: InputLabelProps) {
  const ctx = useContext(InputContext);
  return (
    <label htmlFor={ctx?.id} className={cn(inputLabelStyle({ size, hidden }), className)}>
      {required && <span className="pr-1.5 text-pink-300">*</span>}
      {label}
      {caption && <span className="pl-1 text-xs text-gray-500">{caption}</span>}
      {children}
    </label>
  );
}
