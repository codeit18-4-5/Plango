"use client";
import { ReactNode } from "react";
import { toast, toastIcon } from "./toast.style";
import IcSuccess from "@/assets/icons/ic-success.svg";
import IcError from "@/assets/icons/ic-error.svg";
import cn from "@/lib/cn";
export default function Toast({
  intent,
  className,
  children,
}: {
  className?: string;
  intent?: "success" | "error";
  children?: ReactNode;
}) {
  return (
    <div className={cn(toast, className)}>
      {intent === "success" && <IcSuccess className={toastIcon} />}
      {intent === "error" && <IcError className={toastIcon} />}
      {children}
    </div>
  );
}
