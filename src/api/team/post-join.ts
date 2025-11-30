import axiosInstance from "@/lib/axios";
import { GroupJoinRequest } from "@/types/group";

const postTaemJoin = async (payload: GroupJoinRequest) => {
  const res = await axiosInstance.post(`/groups/accept-invitation`, payload);

  return res.data;
};

export default postTaemJoin;
