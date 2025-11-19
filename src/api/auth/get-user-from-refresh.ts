"use server";
import { User } from "@/types/user";

type SSRUserPayload = {
  user: User | null;
  accessToken: string | null;
};
const INIT_PAYLOAD = { user: null, accessToken: null };
const getUserFromRefresh = async (refreshToken?: string): Promise<SSRUserPayload> => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  if (!refreshToken) return INIT_PAYLOAD;

  try {
    // 서버에서 백엔드로 refresh 요청
    const refreshRes = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });

    if (!refreshRes.ok) return INIT_PAYLOAD;

    const { accessToken } = await refreshRes.json();
    if (!accessToken) return INIT_PAYLOAD;

    // accessToken으로 유저 정보 조회 (백엔드 API)
    const userRes = await fetch(`${BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    if (!userRes.ok) return INIT_PAYLOAD;
    const user = await userRes.json();

    return { accessToken, user };
  } catch (err) {
    console.error(err);
    return INIT_PAYLOAD;
  }
};

export default getUserFromRefresh;
