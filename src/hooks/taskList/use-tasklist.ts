import { getGroupTaskLists, getTaskDetail, getTaskList } from "@/api/tasklist";
import { TaskDetail, TaskDetailProps, TaskListProps } from "@/types/task";
import { GroupTaskList, TaskList } from "@/types/tasklist";
import { useQuery } from "@tanstack/react-query";

/**
 * TaskList 조회 훅
 * @param groupId
 * @param taskListId
 */

export function useGroupTaskLists(groupId: number) {
  return useQuery<GroupTaskList>({
    queryKey: ["groupTaskLists", groupId],
    queryFn: () => getGroupTaskLists(groupId),
    enabled: !!groupId,
    staleTime: 1000 * 60 * 5, // 5분
  });
}

export function useTaskList({ groupId, taskListId, date }: TaskListProps) {
  return useQuery<TaskList>({
    queryKey: ["taskList", groupId, taskListId, date],
    queryFn: () => getTaskList({ groupId, taskListId, date }),
    enabled: !!(groupId && taskListId && date),
    staleTime: 1000 * 60 * 5,
  });
}

export function useTaskDetail({ groupId, taskListId, taskId }: TaskDetailProps) {
  return useQuery<TaskDetail>({
    queryKey: ["taskDetail", groupId, taskListId, taskId],
    queryFn: () => getTaskDetail({ groupId, taskListId, taskId }),
    enabled: !!(groupId && taskListId && taskId),
    staleTime: 1000 * 60 * 5,
  });
}
