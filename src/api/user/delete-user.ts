import axiosInstance from "@/lib/axios";

const deleteUser = async () => {
  const res = await axiosInstance.delete("/user");
  return res;
};
export default deleteUser;
