import axiosInstance from "@/lib/axios";
import { OAuth } from "@/types/auth";

const PostOAuth = async (data: OAuth) => {
  const res = await axiosInstance.post("/oauthApps", data);
  return res;
};
export default PostOAuth;
