"use client";

import KakaoSkeleton from "@/components/skeleton-ui/kakao-skeleton";
import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<KakaoSkeleton />}>{children}</Suspense>;
}
