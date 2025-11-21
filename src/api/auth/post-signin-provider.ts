import axiosInstance from "@/lib/axios";
import { OauthProvider } from "@/types/auth";

const postSignInProvider = async (provider: "KAKAO", data: OauthProvider) => {
  const res = await axiosInstance.post(`/auth/signIn/${provider}`, data);
  return res.data;
};
export default postSignInProvider;
