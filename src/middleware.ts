import { NextRequest, NextResponse } from "next/server";
import { GUEST_ONLY, PROTECTED_PATHS } from "./constants/url";

/**
 * 라우팅 보호 미들웨어
 * @author sohyun
 */

//prefix 기준으로 인증이 필요한 라우팅 보호
const isProtectedPath = (path: string) => {
  return PROTECTED_PATHS.some(prefix => path.startsWith(prefix));
};

export const middleware = (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const auth = req.cookies.get("refreshToken")?.value;

  // 게스트 상태
  if (!auth) {
    if (isProtectedPath(pathname)) return NextResponse.rewrite(new URL("/not-found", req.url));
    return NextResponse.next();
  }

  // 로그인 상태
  if (GUEST_ONLY.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
};
