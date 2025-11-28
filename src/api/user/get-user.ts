import axiosInstance from "@/lib/axios";
import { User } from "@/types/user";

const getUser = async (): Promise<User> => {
  const res = await axiosInstance.get("/user");
  return res.data;
};
export default getUser;