import axios from "axios";
import { cookies } from "next/headers";

const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

serverAxios.interceptors.request.use(
  async config => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  err => Promise.reject(err),
);

serverAxios.interceptors.response.use(
  res => res,
  err => {
    const { response } = err;
    if (response?.status === 401) {
      throw new Error("Unauthorized");
    }
    return Promise.reject(err);
  },
);

export default serverAxios;
