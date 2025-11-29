import axiosInstance from "@/lib/axios";

type postTodoprops = {
  groupId: number;
  param: string;
};

const postTodo = async ({ groupId, param }: postTodoprops) => {
  const payload = { name: param };
  const res = await axiosInstance.post(`/groups/${groupId}/task-lists`, payload);
  return res;
};

export default postTodo;
