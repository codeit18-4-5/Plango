import {
  deleteAllRecurring,
  deleteComment,
  deleteOneRecurring,
  getGroupTaskLists,
  getMemberInfo,
  getTaskComments,
  getTaskDetail,
  getTaskList,
  patchComment,
  patchRecurring,
  patchRecurringDoneAt,
  postComment,
  postRecurring,
  postTask,
} from "@/api/tasklist";
import { Comment } from "@/types/comments";
import { Task, TaskDetail, TaskDetailProps, TaskListProps } from "@/types/task";
import { GroupTaskList, MemberInfo, MemberPermissionProps, TaskList } from "@/types/tasklist";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * TaskList 조회 훅
 * @param groupId
 * @param taskListId
 */

// 멤버 인증 (api호출시 체크용)
export const userMemberPermission = ({ groupId, userId }: MemberPermissionProps) => {
  return useQuery<MemberInfo>({
    queryKey: ["memberInfo", groupId, userId],
    queryFn: () => getMemberInfo({ groupId, userId }),
    enabled: !!userId && !!groupId,
    staleTime: 1000 * 30, // 30초마다 체크
    refetchOnWindowFocus: true,
  });
};

// group-------------------------------------------------------------------------
export const useGroupTaskLists = (groupId: number) => {
  return useQuery<GroupTaskList>({
    queryKey: ["groupTaskLists", groupId],
    queryFn: () => getGroupTaskLists(groupId),
    enabled: !!groupId,
    staleTime: 1000 * 60 * 5, // 5분
  });
};

// taskList----------------------------------------------------------------------
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

export const useTaskListMutation = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: postTask,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["groupTaskLists", variables.groupId],
      });
    },
    onError: error => console.error("할 일 목록 등록 실패.", error),
  });
  return { create };
};

// recurring (taskDetail)--------------------------------------------------------
export const useRecurring = ({ groupId, taskListId, taskId }: TaskDetailProps) => {
  return useQuery<TaskDetail>({
    queryKey: ["taskDetail", groupId, taskListId, taskId],
    queryFn: () => getTaskDetail({ groupId, taskListId, taskId }),
    enabled: !!(groupId && taskListId && taskId),
    staleTime: 1000 * 60 * 5,
  });
};

export const useRecurringMutation = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: postRecurring,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["taskList", variables.groupId, variables.taskListId, variables.dateString],
      });
    },
    onError: error => console.error("할 일 상세 등록 실패.", error),
  });

  const update = useMutation({
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
                ...(variables.description !== undefined && {
                  description: variables.description,
                }),
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

  const remove = useMutation({
    mutationFn: async (
      variables: TaskDetailProps & {
        recurringId?: number;
        dateString: string;
      },
    ) => {
      const { groupId, taskListId, taskId, recurringId, dateString } = variables;

      if (recurringId) {
        return deleteAllRecurring({
          groupId,
          taskListId,
          taskId,
          recurringId,
          dateString,
        });
      }

      return deleteOneRecurring({
        groupId,
        taskListId,
        taskId,
        dateString,
      });
    },
    onMutate: async variables => {
      const queryKey = ["taskList", variables.groupId, variables.taskListId, variables.dateString];

      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<TaskList>(queryKey);

      queryClient.setQueryData<TaskList>(queryKey, (old: TaskList | undefined) => {
        if (!old?.tasks) return old;
        const updatedTasks = old.tasks.filter(task => task.id !== variables.taskId);
        return { ...old, tasks: updatedTasks };
      });
      return { previousData, queryKey };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(context.queryKey, context.previousData);
      }
      console.error("할 일 삭제 실패.", error);
    },
    onSettled: (data, error, variables, context) => {
      if (!context) return;

      if (variables.recurringId) {
        queryClient.invalidateQueries({ queryKey: ["taskList", variables.groupId] });
      } else {
        queryClient.invalidateQueries({
          queryKey: context.queryKey,
        });
      }
    },
  });

  const updateDoneAt = useMutation({
    mutationFn: patchRecurringDoneAt,

    onMutate: async variables => {
      await queryClient.cancelQueries({
        queryKey: ["taskList", variables.groupId, variables.taskListId, variables.dateString],
      });
      await queryClient.cancelQueries({
        queryKey: ["taskDetail", variables.groupId, variables.taskListId, variables.taskId],
      });

      const previousTaskList = queryClient.getQueryData<TaskList>([
        "taskList",
        variables.groupId,
        variables.taskListId,
        variables.dateString,
      ]);

      const previousTaskDetail = queryClient.getQueryData<Task>([
        "taskDetail",
        variables.groupId,
        variables.taskListId,
        variables.taskId,
      ]);

      queryClient.setQueryData<TaskList>(
        ["taskList", variables.groupId, variables.taskListId, variables.dateString],
        old => {
          if (!old) return old;

          return {
            ...old,
            tasks: old.tasks.map((task: Task) =>
              task.id === variables.taskId ? { ...task, isCompleted: variables.done } : task,
            ),
          };
        },
      );

      queryClient.setQueryData<Task>(
        ["taskDetail", variables.groupId, variables.taskListId, variables.taskId],
        old => {
          if (!old) return old;
          return { ...old, isCompleted: variables.done };
        },
      );

      return { previousTaskList, previousTaskDetail };
    },

    onError: (error, variables, context) => {
      if (context?.previousTaskList) {
        queryClient.setQueryData(
          ["taskList", variables.groupId, variables.taskListId, variables.dateString],
          context.previousTaskList,
        );
      }

      if (context?.previousTaskDetail) {
        queryClient.setQueryData(
          ["taskDetail", variables.groupId, variables.taskListId, variables.taskId],
          context.previousTaskDetail,
        );
      }

      console.error("할 일 수정 실패.", error);
    },

    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["taskList", variables.groupId, variables.taskListId, variables.dateString],
      });
      queryClient.invalidateQueries({
        queryKey: ["taskDetail", variables.groupId, variables.taskListId, variables.taskId],
      });
    },
  });
  return { create, update, remove, updateDoneAt };
};

// comment ----------------------------------------------------------------------
export const useTaskComments = (taskId: number) => {
  return useQuery<Comment[]>({
    queryKey: ["taskComments", taskId],
    queryFn: () => getTaskComments(taskId),
    enabled: !!taskId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useTaskCommentsMutation = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: postComment,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["taskComments", variables.taskId],
      });
      queryClient.invalidateQueries({
        queryKey: ["taskList", variables.groupId, variables.taskListId, variables.dateString],
      });
    },
    onError: error => console.error("댓글 등록 실패.", error),
  });

  const update = useMutation({
    mutationFn: patchComment,
    onMutate: async variables => {
      await queryClient.cancelQueries({ queryKey: ["taskComments", variables.taskId] });

      const previousComments = queryClient.getQueryData<Comment[]>([
        "taskComments",
        variables.taskId,
      ]);

      queryClient.setQueryData<Comment[]>(["taskComments", variables.taskId], old => {
        if (!old) return old;
        return old.map(comment =>
          comment.id === variables.commentId ? { ...comment, content: variables.comment } : comment,
        );
      });
      return { previousComments };
    },
    onError: (error, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(["taskComments", variables.taskId], context.previousComments);
      }
      console.error("댓글 수정 실패", error);
    },

    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["taskComments", variables.taskId],
      });
      queryClient.invalidateQueries({
        queryKey: ["taskList", variables.groupId, variables.taskListId, variables.dateString],
      });
    },
  });

  const remove = useMutation({
    mutationFn: deleteComment,
    onMutate: async variables => {
      await queryClient.cancelQueries({ queryKey: ["taskComments", variables.taskId] });

      const previousComments = queryClient.getQueryData<Comment[]>([
        "taskComments",
        variables.taskId,
      ]);

      queryClient.setQueryData<Comment[]>(["taskComments", variables.taskId], old => {
        if (!old) return old;
        return old.filter(comment => comment.id !== variables.commentId);
      });
      return { previousComments };
    },
    onError: (error, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(["taskComments", variables.taskId], context.previousComments);
      }
      console.error("댓글 삭제 실패", error);
    },

    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["taskComments", variables.taskId],
      });
      queryClient.invalidateQueries({
        queryKey: ["taskList", variables.groupId, variables.taskListId, variables.dateString],
      });
    },
  });

  return { create, update, remove };
};
