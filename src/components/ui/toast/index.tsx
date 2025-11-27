"use client";
import { ReactNode } from "react";
import { toast, toastIcon } from "./toast.style";
import IcSuccess from "@/assets/icons/ic-success.svg";
import IcError from "@/assets/icons/ic-error.svg";
export default function Toast({
  intent,
  children,
}: {
  intent?: "success" | "error";
  children?: ReactNode;
}) {
  return (
    <div className={toast}>
      {intent === "success" && <IcSuccess className={toastIcon} />}
      {intent === "error" && <IcError className={toastIcon} />}
      {children}
    </div>
  );
}
