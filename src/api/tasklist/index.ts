"use client";

import { TaskDetailProps, TaskListProps } from "@/types/task";
import axiosInstance from "@/lib/axios";
import { MemberPermissionProps } from "@/types/tasklist";
import z4 from "zod/v4";
import { taskDetailSchema } from "@/lib/schema";

export async function getGroupTaskLists(groupId: number) {
  try {
    const res = await axiosInstance.get(`/groups/${groupId}`);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getTaskList({ groupId, taskListId, date }: TaskListProps) {
  try {
    const params = new URLSearchParams();
    params.append("date", date);

    const res = await axiosInstance.get(
      `/groups/${groupId}/task-lists/${taskListId}?${params.toString()}`,
    );
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getTaskDetail({ groupId, taskListId, taskId }: TaskDetailProps) {
  try {
    const res = await axiosInstance.get(
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    );
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getMemberInfo({ groupId, userId }: MemberPermissionProps) {
  try {
    const res = await axiosInstance.get(`/groups/${groupId}/member/${userId}`);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function postRecurring({
  groupId,
  taskListId,
  recurringData,
}: {
  groupId: number;
  taskListId: number;
  recurringData: z4.infer<typeof taskDetailSchema>;
  dateString?: string;
}) {
  try {
    const res = await axiosInstance.post(
      `/groups/${groupId}/task-lists/${taskListId}/recurring`,
      recurringData,
    );
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function postTask({ groupId, name }: { groupId: number; name: string }) {
  try {
    const res = await axiosInstance.post(`/groups/${groupId}/task-lists`, { name });
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function patchRecurring({
  groupId,
  taskListId,
  taskId,
  name,
  description,
}: TaskDetailProps & { name?: string; description?: string; dateString: string }) {
  try {
    const payload = Object.fromEntries(
      Object.entries({ name, description }).filter(([, value]) => value !== undefined),
    );

    const res = await axiosInstance.patch(
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
      payload,
    );

    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function patchRecurringDoneAt({
  groupId,
  taskListId,
  taskId,
  done,
}: TaskDetailProps & { done: boolean; dateString: string }) {
  try {
    const res = await axiosInstance.patch(
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
      { done },
    );

    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function deleteOneRecurring({
  groupId,
  taskListId,
  taskId,
}: TaskDetailProps & { dateString: string }) {
  try {
    const res = await axiosInstance.delete(
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    );

    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function deleteAllRecurring({
  groupId,
  taskListId,
  taskId,
  recurringId,
}: TaskDetailProps & { recurringId: number; dateString: string }) {
  try {
    const res = await axiosInstance.delete(
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/recurring/${recurringId}`,
    );

    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getTaskComments(taskId: number) {
  try {
    const res = await axiosInstance.get(`/tasks/${taskId}/comments`);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
