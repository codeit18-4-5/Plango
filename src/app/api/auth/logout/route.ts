import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * 로그아웃으로 쿠키 삭제
 * @author sohyun
 */
export const POST = async () => {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "refreshToken",
    value: "",
    maxAge: 0,
    path: "/",
  });
  cookieStore.set({
    name: "accessToken",
    value: "",
    maxAge: 0,
    path: "/",
  });
  return NextResponse.json({ success: true }, { status: 200 });
};
