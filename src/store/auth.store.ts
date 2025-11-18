import { Token } from "@/types/auth";
import { User } from "@/types/user";
import { create } from "zustand";

/**
 * 인증 관련 전역 상태
 * @author sohyun
 * - accessToken: Authorization 헤더에 붙는 JWT
 * - user: 현재 로그인한 유저 정보
 * - authError: 로그인/회원가입 중 발생한 에러를 모달로 노출
 */

type AuthState = {
  accessToken: Token;
  user: User | null;
  setAccessToken: (token: Token) => void;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
};

type UIState = {
  authError: string | null;
  setAuthError: (msg: string | null) => void;
};

export const useAuthStore = create<AuthState>(set => {
  return {
    accessToken: null,
    user: null,

    setAccessToken: token => set({ accessToken: token }),
    setUser: user => set({ user }),
    clearAuth: () => set({ accessToken: null, user: null }),
  };
});

export const useUIStore = create<UIState>(set => ({
  authError: null,
  setAuthError: msg => set({ authError: msg }),
}));
