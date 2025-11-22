import axiosInstance from "@/lib/axios";
import { OAuth } from "@/types/auth";

const postOAuth = async (data: OAuth) => {
  const res = await axiosInstance.post("/oauthApps", data);
  console.log("kakao 등록");
  return res;
};
export default postOAuth;
