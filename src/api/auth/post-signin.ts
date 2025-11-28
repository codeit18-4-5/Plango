import axiosInstance from "@/lib/axios";
import { SignIn } from "@/types/auth";

const postSignIn = async (signInData: SignIn) => {
  const res = await axiosInstance.post("/auth/signIn", signInData);
  return res.data;
};
export default postSignIn;
