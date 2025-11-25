"use client";

import { Suspense } from "react";
import { ResetPassword } from "@/components/features/auth";

export default function Page() {
  return (
    <Suspense fallback={<p>비밀번호 변경 준비중...</p>}>
      <ResetPassword />
    </Suspense>
  );
}
