import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
/**
 * 로그아웃 처리 훅, 필요시 메인 페이지 리다이렉트
 * @author sohyun
 */
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export const logoutDirect = async () => {
  try {
    await fetch(`${APP_URL}/api/auth/logout`, { method: "POST" });
  } finally {
    useAuthStore.getState().actions.clearAuth();
  }
};

const useLogout = () => {
  const router = useRouter();

  return async ({ isRedirect = true } = {}) => {
    await logoutDirect();
    if (isRedirect) router.replace("/");
  };
};
export default useLogout;
