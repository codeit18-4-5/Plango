import axiosInstance from "@/lib/axios";
import { OauthProvider } from "@/types/auth";

const postSignInProvider = async (data: OauthProvider) => {
  const res = await axiosInstance.post(`/auth/signIn/KAKAO`, data);
  return res.data;
};
export default postSignInProvider;
