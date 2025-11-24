import axiosInstance from "@/lib/axios";
import { GroupCreateRequest, GroupCreateResponse } from "@/types/group";

const postGroups = async (param?: GroupCreateRequest): Promise<GroupCreateResponse> => {
  const res = await axiosInstance.post("/groups", param);
  return res.data;
};

export default postGroups;
