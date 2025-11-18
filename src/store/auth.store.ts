import { Token } from "@/types/auth";
import { User } from "@/types/user";
import { create } from "zustand";

/**
 * 인증 관련 전역 상태
 * @author sohyun
 * - initialized: 초기 SSR 로그인시 사용
 * - accessToken: Authorization 헤더에 붙는 JWT
 * - user: 현재 로그인한 유저 정보
 * - authError: 로그인/회원가입 중 발생한 에러를 모달로 노출
 */

type AuthState = {
  initialized: boolean;
  accessToken: Token;
  user: User | null;

  actions: {
    setInitialized: (value: boolean) => void;
    setAccessToken: (token: Token) => void;
    setUser: (user: User | null) => void;
    updateUser: (payload: Partial<User>) => void;
    clearAuth: () => void;
  };
};

type UIState = {
  authError: string | null;
  setAuthError: (msg: string | null) => void;
};

export const useAuthStore = create<AuthState>(set => {
  return {
    initialized: false,
    accessToken: null,
    user: null,
    actions: {
      setInitialized: initialized => set({ initialized }),
      setAccessToken: token => set({ accessToken: token }),
      setUser: user => set({ user }),
      updateUser: (payload: Partial<User>) =>
        set(state => {
          if (!state.user) return state;

          return { user: { ...state.user, ...payload } };
        }),
      clearAuth: () => set({ accessToken: null, user: null }),
    },
  };
});

export const useUIStore = create<UIState>(set => ({
  authError: null,
  setAuthError: msg => set({ authError: msg }),
}));
