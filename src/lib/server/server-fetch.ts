"use server";
import { isNoAuthURL } from "@/lib/utils";
import { cookies } from "next/headers";
import { ServerFetchError } from "./error";
import { redirect } from "next/navigation";
import getNewAccessToken from "@/api/auth/get-new-access-token";

/**
 * server fetch 헬퍼 함수
 * @author sohyun
 * @param path  백엔드 api url
 * @param option fetch api 옵션
 */

type Token = string | null;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const serverFetch = async <T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  const cookieStore = await cookies();
  const refreshTokenCookie = cookieStore.get("refreshToken")?.value ?? null;
  const accessTokenCookie = cookieStore.get("accessToken")?.value ?? null;

  const method = (options.method || "GET").toLowerCase();
  const noAuth = isNoAuthURL(path, method);

  // fetch headers 옵션이 있으면 반영
  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
  };

  // fetch header 조합
  const request = async (token: Token) => {
    // 인증이 필요한 요청 처리
    const originHeaders = {
      ...headers,
      ...(!noAuth && token ? { Authorization: `Bearer ${token}` } : {}),
    };
    // 원래 요청 인증 붙여서 처리
    const originRes = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: originHeaders,
    });
    return originRes;
  };

  const res = await request(accessTokenCookie);

  // 요청 성공
  if (res.ok) return res.json() as T;

  // accessToken 만료인데 refreshToken도 없음
  if (res.status === 401 && !refreshTokenCookie)
    throw new ServerFetchError("로그인이 필요합니다", res.status);

  // accessToken만 만료시 재발급
  if (res.status === 401 && refreshTokenCookie) {
    const newAccessToken = await getNewAccessToken(refreshTokenCookie);

    // refreshToken은 있지만 새 accessToken을 발급 실패한 경우
    if (!newAccessToken) {
      throw new ServerFetchError("refresh 토큰 재발급 실패", 401);
    }

    // 재발급된 accessToken으로 기존 요청 재시도
    const retry = await request(newAccessToken);
    if (!retry.ok) {
      throw new ServerFetchError("요청 실패", retry.status);
    }

    // 토큰 재발급 성공 및 반환
    return retry.json();
  }

  throw new ServerFetchError("요청 실패", res.status);
};

/**
 * server fetch 함수의 인증 실패 시 자동 로그아웃 함수
 * @author sohyun
 * @example 
 * return serverApi(() =>
    serverFetch<Type>(`/user/history`, {
      method: "GET",
    })
  );
 */

export const serverApi = async <T>(apiFn: () => Promise<T>): Promise<T> => {
  try {
    return await apiFn();
  } catch (err) {
    if (err instanceof ServerFetchError && err.status === 401) {
      // 인증 실패시 로그아웃 처리 (쿠키 삭제 및 로그인 페이지)
      const cookieStore = await cookies();
      cookieStore.set("refreshToken", "", { maxAge: 0, path: "/" });
      cookieStore.set("accessToken", "", { maxAge: 0, path: "/" });

      redirect("/login?expired=true");
    }

    throw err;
  }
};
