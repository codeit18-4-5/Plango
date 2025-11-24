"use client";

import { Suspense } from "react";
import { KakaoRedirect } from "@/components/features/auth";

export default function Page() {
  return (
    <Suspense fallback={<p>카카오 로그인 준비중...</p>}>
      <KakaoRedirect />
    </Suspense>
  );
}
