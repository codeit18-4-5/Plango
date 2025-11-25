import axiosInstance from "@/lib/axios";
import { UserResetPassword } from "@/types/user";

const patchResetPassword = async (data: UserResetPassword) => {
  const res = await axiosInstance.patch("/user/reset-password", data);
  return res.data;
};
export default patchResetPassword;
