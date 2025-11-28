import axiosInstance from "@/lib/axios";

const getHistory = async () => {
  const res = await axiosInstance.get(`/user/history`);
  return res.data;
};
export default getHistory;
