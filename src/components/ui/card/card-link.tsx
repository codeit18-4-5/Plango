"use client";

import cn from "@/lib/cn";
import { ReactNode } from "react";
import { CARD_WRAPPER_STYLES } from "./index.styles";
type CardLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export default function CardLink({ href, children, className }: CardLinkProps) {
  return (
    <a href={href} className={cn(CARD_WRAPPER_STYLES.inner, className)}>
      {children}
    </a>
  );
}
