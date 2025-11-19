import axiosInstance from "@/lib/axios";
import { UserUpdate } from "@/types/user";

const patchUser = async (user: UserUpdate) => {
  const res = await axiosInstance.patch("/user", user);
  return res;
};
export default patchUser;
