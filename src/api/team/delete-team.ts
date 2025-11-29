import axiosInstance from "@/lib/axios";

const deleteTeam = async (groupId: number) => {
  const res = await axiosInstance.delete(`/groups/${groupId}`);
  return res;
};

export default deleteTeam;
