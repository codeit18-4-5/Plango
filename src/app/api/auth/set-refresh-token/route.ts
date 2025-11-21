import { createErrorResponse } from "@/lib/server/error";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * 로그인 성공시 전달된 refreshToken을 쿠키로 저장하는 Route
 * @author sohyun
 */
export const POST = async (req: NextRequest) => {
  try {
    // 전달받은 refreshToken
    const { refreshToken } = await req.json();

    if (!refreshToken) {
      // refreshToken이 정상적이지 않는 경우
      return createErrorResponse(
        "set-refresh router : refreshToken 없음",
        "로그인 과정에서 오류가 발생했습니다. 다시 로그인해주세요.",
        400,
      );
    }
    // 쿠키설정
    const cookieStore = await cookies();
    cookieStore.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7일
      path: "/",
      sameSite: "lax",
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return createErrorResponse(
      `쿠키 설정 중 오류가 발생했습니다 : ${error}`,
      "일시적인 오류가 발생했습니다. 다시 시도해주세요.",
      500,
    );
  }
};
