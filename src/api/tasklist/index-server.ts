import serverAxios from "@/lib/axios-server";
import { TaskListProps } from "@/types/task";

export async function getGroupTaskListsforServer(groupId: number) {
  if (!groupId) return [];

  try {
    const res = await serverAxios.get(`/groups/${groupId}`);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getTaskListForServer({ groupId, taskListId, date }: TaskListProps) {
  if (!groupId || !taskListId || !date) return [];

  try {
    const params = new URLSearchParams();
    params.append("date", date);

    const res = await serverAxios.get(
      `/groups/${groupId}/task-lists/${taskListId}?${params.toString()}`,
    );
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
