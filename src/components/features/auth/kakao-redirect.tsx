"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthSuccess } from "@/hooks";
import postSignInProvider from "@/api/auth/post-signin-provider";
import { AuthErrorModal } from "@/components/features/auth";

/**
 * 카카오 로그인 인가 코드 받기 위한 리다이렉트 URL
 * @author sohyun
 */

const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
export default function KakaoRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authSuccess = useAuthSuccess();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    // 사용자 동의 거부나 에러발생
    if (error || !code) {
      setShowError(true);
      return;
    }

    const handleCallback = async () => {
      if (!KAKAO_REDIRECT_URI) {
        setShowError(true);
        return;
      }

      try {
        // 백엔드에 code 전달 후 토큰/유저 발급 받기
        const res = await postSignInProvider({
          token: code,
          redirectUri: KAKAO_REDIRECT_URI,
          state: "",
        });
        await authSuccess(res);
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.error("카카오 로그인 실패:", err);
        }
        setShowError(true);
      }
    };

    handleCallback();
  }, [searchParams, authSuccess]);

  if (showError) {
    return (
      <AuthErrorModal
        message="카카오 로그인에 실패하였습니다."
        onClose={() => router.replace("/login")}
      />
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>카카오 계정으로 로그인 중입니다...</p>
    </div>
  );
}
