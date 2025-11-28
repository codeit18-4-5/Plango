import { useRouter } from "next/navigation";
import { logoutDirect } from "@/lib/token";
/**
 * 로그아웃 처리 훅, 필요시 메인 페이지 리다이렉트
 * @author sohyun
 */

const useLogout = () => {
  const router = useRouter();

  return async ({ isRedirect = true } = {}) => {
    await logoutDirect();
    if (isRedirect) router.replace("/");
  };
};
export default useLogout;
