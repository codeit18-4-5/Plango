"use client";

import { Suspense } from "react";
import { Signup } from "@/components/features/auth";

export default function Page() {
  return (
    <Suspense fallback={<p>회원가입 준비중...</p>}>
      <Signup />
    </Suspense>
  );
}
