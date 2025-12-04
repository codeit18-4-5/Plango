"use client";

import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { User } from "@/types/user";
import { getAccessToken } from "@/lib/token";

/**
 * 최초 렌더링 시 SSR 기반 로그인
 * @author sohyun
 */
type AuthProviderProps = {
  initialUser: User | null;
  children: ReactNode;
};
export default function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const { setUser, setInitialized } = useAuthStore(state => state.actions);

  useEffect(() => {
    // SSR 기반 로그인
    if (initialUser) setUser(initialUser);

    const accessToken = getAccessToken();

    // accessToken 있으면 refresh 안함
    if (accessToken) {
      setInitialized(true);
      return;
    }
    const accessTokenCookie = async () => {
      try {
        // refreshToken이 있으면 accessToken 재발급, 없으면 무시
        await fetch("/api/auth/initial-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      } finally {
        setInitialized(true);
      }
    };

    accessTokenCookie();
  }, []);

  return <>{children}</>;
}
