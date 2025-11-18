import { createErrorResponse } from "@/lib/server/error";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * 쿠키에 있는 refreshToken으로 백엔드에 토큰 재발급 요청
 * @author sohyun
 */
export const POST = async () => {
  try {
    // 쿠키에서 refreshToken 가져오기
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      // refreshToken 없는 경우 로그아웃
      return createErrorResponse(
        "refresh route : refreshToken 없음",
        "로그인이 만료되었습니다. 다시 로그인해주세요.",
        401,
      );
    }

    // 백엔드 서버에 토큰 재발급 요청
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await res.json();

    if (!res.ok || !data.accessToken) {
      // refreshToken은 있지만 새 accessToken을 발급 실패한 경우
      return createErrorResponse(
        "refresh route : 백엔드 accessToken 발급에 실패",
        "로그인이 만료되었습니다. 다시 로그인해주세요.",
        401,
      );
    }
    // accessToken 반환
    return NextResponse.json({ accessToken: data.accessToken }, { status: 200 });
  } catch (error) {
    return createErrorResponse(
      `refresh 처리 중 서버 오류 발생 : ${error}`,
      "일시적인 오류가 발생했습니다. 다시 시도해주세요.",
      500,
    );
  }
};
