import axiosInstance from "@/lib/axios";

type patchTodoprops = {
  groupId: number;
  taskListId: number;
  name: string;
};

const patchTodo = async ({ groupId, taskListId, name }: patchTodoprops) => {
  const payload = { name: name };

  const res = await axiosInstance.patch(`/groups/${groupId}/task-lists/${taskListId}`, payload);
  return res;
};

export default patchTodo;
