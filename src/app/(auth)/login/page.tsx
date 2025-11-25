"use client";

import { Suspense } from "react";
import { Login } from "@/components/features/auth";

export default function Page() {
  return (
    <Suspense fallback={<p>로그인 준비중...</p>}>
      <Login />
    </Suspense>
  );
}
