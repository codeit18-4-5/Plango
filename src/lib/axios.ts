import { useAuthStore } from "@/store/auth.store";
import axios, { AxiosInstance } from "axios";
import { isNoAuthURL } from "./utils";
import { logoutDirect } from "./logout";

/**
 * axios 인터셉터:  then 또는 catch로 처리되기 전에 요청과 응답을 가로채는 기능
 * @author sohyun
 */

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;

// 요청 인터셉터: axios 요청시 accessToken 자동 추가
axiosInstance.interceptors.request.use(
  config => {
    const accessToken = useAuthStore.getState().accessToken;

    // 토큰이 필요 없는 URL
    if (isNoAuthURL(config)) return config;

    // 인증이 필요한 요청 처리
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  err => Promise.reject(err),
);

// 응답 인터셉터: axios 요청시 accessToken 만료시 재발급
axiosInstance.interceptors.response.use(
  res => res,
  async err => {
    const { response, config } = err;
    if (response?.status !== 401) {
      return Promise.reject(err);
    }

    //  무한 루프 방지
    if (config._retry) {
      return Promise.reject(err);
    }
    config._retry = true;

    // refresh route 요청해서 새 accessToken 받아오기
    const refreshRes = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    // 기존 요청 재시도
    if (refreshRes.ok) {
      const { accessToken } = await refreshRes.json();
      // accessToken 업데이트
      useAuthStore.getState().actions.setAccessToken(accessToken);

      config.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(config);
    }

    // refresh 실패시 로그아웃
    await logoutDirect();
    window.location.href = "/login";
  },
);
