"use client";

import { Suspense } from "react";
import { Signup } from "@/components/features/auth";

export default function Page() {
  return (
    <Suspense fallback={<p>로그인 준비중...</p>}>
      <Signup />
    </Suspense>
  );
}
