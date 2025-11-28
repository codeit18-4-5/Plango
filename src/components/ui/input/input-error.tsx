"use client";
import cn from "@/lib/cn";
import { useContext } from "react";
import { InputContext } from "./input.context";
import { inputErrorStyle } from "./input.style";

type InputErrorProps = {
  className?: string;
};

export default function InputError({ className }: InputErrorProps) {
  const ctx = useContext(InputContext);
  return ctx?.errorMsg && <p className={cn(inputErrorStyle, className)}>{ctx?.errorMsg}</p>;
}
