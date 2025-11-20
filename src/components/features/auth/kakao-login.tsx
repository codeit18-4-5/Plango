import IcKakao from "@/assets/icons/ic-kakao.svg";
import { useUIStore } from "@/store/auth.store";
import { MouseEvent } from "react";

/**
 * 카카오 로그인 버튼(인가 페이지 이동)
 * @author sohyun
 */

const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export default function KakaoLogin() {
  const setAuthError = useUIStore(state => state.setAuthError);

  const handleKakaoLogin = (e: MouseEvent) => {
    e.preventDefault();

    if (!KAKAO_REST_API_KEY || !KAKAO_REDIRECT_URI) {
      setAuthError("카카오 로그인에 실패하였습니다.");
      return;
    }
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${encodeURIComponent(
      KAKAO_REST_API_KEY,
    )}&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}&response_type=code`;

    window.location.href = kakaoAuthUrl;
  };

  return (
    <button
      type="button"
      onClick={handleKakaoLogin}
      className="h-11 w-11"
      aria-label="카카오로 로그인하기"
    >
      <IcKakao />
    </button>
  );
}
