import axiosInstance from "@/lib/axios";
import { SignUp } from "@/types/auth";

const postSignUp = async (signUpData: SignUp) => {
  const res = await axiosInstance.post("/auth/signUp", signUpData);
  return res.data;
};
export default postSignUp;
