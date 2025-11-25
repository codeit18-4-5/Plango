import {
  getGroupTaskLists,
  getMemberInfo,
  getTaskDetail,
  getTaskList,
  patchRecurring,
  postRecurring,
  postTask,
} from "@/api/tasklist";
import { TaskDetail, TaskDetailProps, TaskListProps } from "@/types/task";
import { GroupTaskList, MemberInfo, MemberPermissionProps, TaskList } from "@/types/tasklist";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * TaskList 조회 훅
 * @param groupId
 * @param taskListId
 */

export const useGroupTaskLists = (groupId: number) => {
  return useQuery<GroupTaskList>({
    queryKey: ["groupTaskLists", groupId],
    queryFn: () => getGroupTaskLists(groupId),
    enabled: !!groupId,
    staleTime: 1000 * 60 * 5, // 5분
  });
};

export const useTaskList = ({
  groupId,
  taskListId,
  date,
  dateString,
}: TaskListProps & { dateString: string }) => {
  return useQuery<TaskList>({
    queryKey: ["taskList", groupId, taskListId, dateString],
    queryFn: () => getTaskList({ groupId, taskListId, date }),
    enabled: !!(groupId && taskListId && date),
    staleTime: 1000 * 60 * 5,
  });
};

export const useTaskDetail = ({ groupId, taskListId, taskId }: TaskDetailProps) => {
  return useQuery<TaskDetail>({
    queryKey: ["taskDetail", groupId, taskListId, taskId],
    queryFn: () => getTaskDetail({ groupId, taskListId, taskId }),
    enabled: !!(groupId && taskListId && taskId),
    staleTime: 1000 * 60 * 5,
  });
};

export const usetMemberPermission = ({ groupId, userId }: MemberPermissionProps) => {
  return useQuery<MemberInfo>({
    queryKey: ["memberInfo", groupId, userId],
    queryFn: () => getMemberInfo({ groupId, userId }),
    enabled: !!userId && !!groupId,
    staleTime: 1000 * 30, // 30초마다 체크
    refetchOnWindowFocus: true,
  });
};

export const createRecurring = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postRecurring,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["taskList", variables.groupId, variables.taskListId, variables.dateString],
      });
    },
    onError: error => console.error("할 일 상세 등록 실패.", error),
  });
};

export const createTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTask,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["groupTaskLists", variables.groupId],
      });
    },
    onError: error => console.error("할 일 목록 등록 실패.", error),
  });
};

export const updateRecurring = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchRecurring,
    onMutate: async variables => {
      const queryKey = ["taskList", variables.groupId, variables.taskListId, variables.dateString];

      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<TaskList>(queryKey);

      queryClient.setQueryData<TaskList>(queryKey, (old: TaskList | undefined) => {
        if (!old?.tasks) return old;
        const updatedTaskList = old.tasks.map(task =>
          task.id === variables.taskId
            ? {
                ...task,
                ...(variables.name !== undefined && { name: variables.name }),
                ...(variables.description !== undefined && { description: variables.description }),
              }
            : task,
        );

        return { ...old, tasks: updatedTaskList };
      });
      return { previousData, queryKey, variables };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<TaskList>(context.queryKey, context.previousData);
      }
      console.error("할 일 수정 실패.", error);
    },
    onSettled: (data, error, variables, context) => {
      if (context) {
        queryClient.invalidateQueries({
          queryKey: context.queryKey,
        });
        queryClient.invalidateQueries({
          queryKey: [
            "taskDetail",
            context.variables.groupId,
            context.variables.taskListId,
            context.variables.taskId,
          ],
        });
      }
    },
  });
};
