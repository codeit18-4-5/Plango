"use client";

import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { User } from "@/types/user";

/**
 * 최초 렌더링 시 SSR 기반 로그인
 * @author sohyun
 */
type AuthProviderProps = {
  initialAccessToken: string | null;
  initialUser: User | null;
  children: ReactNode;
};
export default function AuthProvider({
  children,
  initialUser,
  initialAccessToken,
}: AuthProviderProps) {
  const { setAccessToken, setUser, setInitialized } = useAuthStore(state => state.actions);

  useEffect(() => {
    // SSR 기반 로그인
    if (initialUser) setUser(initialUser);

    if (initialAccessToken) setAccessToken(initialAccessToken);

    setInitialized(true);
  }, [initialUser, initialAccessToken]);

  return <>{children}</>;
}
