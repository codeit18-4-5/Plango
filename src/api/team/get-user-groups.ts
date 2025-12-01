import axiosInstance from "@/lib/axios";
import { GetUserGroup } from "@/types/group";

const getUserGroups = async (): Promise<GetUserGroup[]> => {
  const res = await axiosInstance.get("/user/groups");

  return res.data;
};

export default getUserGroups;
