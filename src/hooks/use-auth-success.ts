"use client";

import { useAuthStore, useUIStore } from "@/store/auth.store";
import { User } from "@/types/user";
import { useRouter, useSearchParams } from "next/navigation";
import useLogout from "./use-logout";

/**
 * 로그인 / 회원가입 성공 이후 공통 처리 훅
 * @author sohyun
 */

type AuthSuccessPayload = {
  accessToken: string;
  refreshToken: string;
  user: User;
};
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const useAuthSuccess = () => {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirect");

  const { setUser } = useAuthStore(state => state.actions);
  const setAuthError = useUIStore(state => state.setAuthError);
  const logout = useLogout();

  return async (authData: AuthSuccessPayload) => {
    const { accessToken, refreshToken, user } = authData;

    try {
      // refreshToken을 HttpOnly 쿠키로 저장
      const res = await fetch(`${APP_URL}/api/auth/set-refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken, accessToken }),
      });

      if (!res.ok) {
        // 쿠키 저장 실패
        await logout({ isRedirect: false });
        setAuthError("로그인 중 오류가 발생했습니다.");
        return;
      }

      // 유저 정보 저장
      setUser(user);

      // 쿼리 파라미터 이동
      router.replace(redirectTo ?? "/");
    } catch {
      await logout({ isRedirect: false });
      setAuthError("네트워크 오류가 발생했습니다");
    }
  };
};
export default useAuthSuccess;
