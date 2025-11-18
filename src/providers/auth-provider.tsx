"use client";

import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import axiosInstance from "@/lib/axios";
import { useLogout } from "@/hooks";

/**
 * 최초 렌더링 시 토큰 파악
 * @author sohyun
 */

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { setAccessToken, setUser } = useAuthStore();
  const logout = useLogout();

  useEffect(() => {
    const initialize = async () => {
      try {
        // refreshToken으로 accessToken 재발급
        const tokenRes = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (!tokenRes.ok) {
          await logout({ isRedirect: false });
          return;
        }

        const { accessToken } = await tokenRes.json();
        setAccessToken(accessToken);

        // 현재 유저 정보 조회
        const userRes = await axiosInstance.get("/user");
        if (!userRes || !userRes.data) {
          throw new Error("유저 정보 없음");
        }

        setUser(userRes.data);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error(error);
        }
        await logout({ isRedirect: false });
      }
    };

    initialize();
  }, []);

  return <>{children}</>;
}
