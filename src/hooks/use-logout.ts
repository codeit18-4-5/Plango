import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
/**
 * 로그아웃 처리 훅, 필요시 메인 페이지 리다이렉트
 * @author sohyun
 */
const useLogout = () => {
  const router = useRouter();
  const useAuthActions = () => useAuthStore(state => state.actions);
  const { clearAuth } = useAuthActions();

  return async ({ isRedirect = true } = {}) => {
    try {
      // 쿠키 삭제
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      // 스토어 초기화
      clearAuth();
    }
    if (isRedirect) router.replace("/");
  };
};
export default useLogout;
