"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthErrorModal } from "@/components/features/auth";
import { useKakaoLogin } from "@/hooks/auth/use-auth";
import KakaoSkeleton from "@/components/skeleton-ui/kakao-skeleton";

/**
 * 카카오 로그인 인가 코드 받기 위한 리다이렉트 URL
 * @author sohyun
 */

const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showError, setShowError] = useState(false);
  const { mutate, isError } = useKakaoLogin();
  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    // 사용자 동의 거부나 에러발생
    if (error || !code || !KAKAO_REDIRECT_URI) {
      setShowError(true);
      return;
    }

    mutate({
      token: code,
      redirectUri: KAKAO_REDIRECT_URI,
      state: "",
    });
  }, [searchParams, mutate]);

  if (isError || showError) {
    return (
      <AuthErrorModal
        message="카카오 로그인에 실패하였습니다."
        onClose={() => router.replace("/login")}
      />
    );
  }

  return (
    <div className="full-scroll-h flex flex-col items-center justify-center gap-3">
      <p>카카오 계정으로 로그인 중입니다</p>
      <KakaoSkeleton line />
    </div>
  );
}
