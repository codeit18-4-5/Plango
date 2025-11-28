"use client";

import AuthSkeleton from "@/components/skeleton-ui/auth-skeleton";
import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<AuthSkeleton intent="signup" />}>{children}</Suspense>;
}
