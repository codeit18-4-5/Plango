import axiosInstance from "@/lib/axios";
import { GroupUpdateBody } from "@/types/group";

const patchGroups = async (groupId: number, updates: GroupUpdateBody) => {
  const res = await axiosInstance.patch(`/groups/${groupId}`, updates);
  return res.data;
};

export default patchGroups;
