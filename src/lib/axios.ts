import axios, { AxiosInstance } from "axios";
import { isNoAuthAxios } from "./utils";

import { getAccessToken, logoutDirect, requestNewAccessToken } from "./token";

/**
 * axios 요청시 헤더에 토큰 추가 및 토큰 만료시 재발급
 * @author sohyun
 */

// axios 인스턴스
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
    // 토큰이 필요 없는 URL
    if (isNoAuthAxios(config)) return config;

    const accessToken = getAccessToken();
    if (!accessToken) return config;

    // 인증이 필요한 요청 처리
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  err => Promise.reject(err),
);

// 응답 인터셉터: axios 요청시 accessToken 만료시 재발급
axiosInstance.interceptors.response.use(
  res => res,
  async err => {
    const { response, config } = err;
    if (!config || response?.status !== 401) {
      return Promise.reject(err);
    }

    //  무한 루프 방지
    if (config._retry) {
      return Promise.reject(err);
    }
    config._retry = true;

    // refresh route 요청해서 새 accessToken 받아오기
    const newToken = await requestNewAccessToken();

    // 기존 요청 재시도
    if (newToken) {
      config.headers.Authorization = `Bearer ${newToken}`;
      return axiosInstance(config);
    }

    // refresh 실패시 로그아웃
    await logoutDirect();
    window.location.href = "/login";
  },
);
