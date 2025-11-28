import axiosInstance from "@/lib/axios";

type MemberDeleteRequestType = {
  groupId: number;
  userId: number;
};

const deleteMember = async ({ groupId, userId }: MemberDeleteRequestType) => {
  const res = await axiosInstance.delete(`/groups/${groupId}/member/${userId}`);
  return res.data;
};

export default deleteMember;
