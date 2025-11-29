import axiosInstance from "@/lib/axios";

const deleteTodo = async ({ groupId, taskListId }: { groupId: number; taskListId: number }) => {
  await axiosInstance.delete(`/groups/${groupId}/task-lists/${taskListId}`);
};

export default deleteTodo;
