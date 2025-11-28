import axiosInstance from "@/lib/axios";
import { GetGroupsResponse } from "@/types/group";

const getGroups = async (groupId: number): Promise<GetGroupsResponse> => {
  const res = await axiosInstance.get(`/groups/${groupId}`);
  return res.data;
};

export default getGroups;
