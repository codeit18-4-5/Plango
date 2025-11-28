import axiosInstance from "@/lib/axios";
import { UserPassword } from "@/types/user";

const patchPassword = async (data: UserPassword) => {
  const res = await axiosInstance.patch("/user/password", data);
  return res.data;
};
export default patchPassword;
