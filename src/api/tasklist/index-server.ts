import { serverFetch } from "@/lib/server/server-fetch";
import { TaskListProps } from "@/types/task";
import { GroupTaskList } from "@/types/tasklist";

export async function getGroupTaskListsforServer(groupId: number): Promise<GroupTaskList> {
  try {
    return await serverFetch(`/groups/${groupId}`, {
      method: "GET",
      cache: "no-store",
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getTaskListForServer({ groupId, taskListId, date }: TaskListProps) {
  try {
    const params = new URLSearchParams();
    params.append("date", date);

    return await serverFetch(`/groups/${groupId}/task-lists/${taskListId}?${params.toString()}`, {
      method: "GET",
      cache: "no-store",
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
}
