"use client";

import { Suspense } from "react";
import { Login } from "@/components/features/auth";

export default function Page() {
  return (
    <Suspense fallback={<p>회원가입 준비중...</p>}>
      <Login />
    </Suspense>
  );
}
