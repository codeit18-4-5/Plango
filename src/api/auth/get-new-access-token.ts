"use server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const getNewAccessToken = async (refreshToken?: string): Promise<string | null> => {
  if (!refreshToken) return null;

  try {
    // 서버에서 백엔드로 refresh 요청
    const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.accessToken ?? null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default getNewAccessToken;
