"use client";

import cn from "@/lib/cn";
import { useContext } from "react";
import { inputLabelStyle } from "./input.style";
import { InputContext } from "./input.context";

type InputLabelProps = {
  label?: string;
  size?: "sm" | "md";
  hidden?: boolean;
  required?: boolean;
  className?: string;
};

export default function InputLabel({
  label,
  size = "sm",
  hidden = false,
  required = false,
  className,
}: InputLabelProps) {
  const ctx = useContext(InputContext);
  return (
    <label htmlFor={ctx?.id} className={cn(inputLabelStyle({ size, hidden }), className)}>
      {required && <span className="pr-1.5 text-pink-300">*</span>}
      {label}
    </label>
  );
}
