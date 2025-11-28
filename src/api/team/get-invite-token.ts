import axiosInstance from "@/lib/axios";

const getInviteToeken = async (groupId: number) => {
  const res = await axiosInstance.get(`/groups/${groupId}/invitation`);
  return res.data;
};

export default getInviteToeken;
