"use client";

import { TaskDetailProps, TaskListProps } from "@/types/task";
import axiosInstance from "@/lib/axios";

export async function getGroupTaskLists(groupId: number) {
  if (!groupId) return [];

  try {
    const res = await axiosInstance.get(`/groups/${groupId}`);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getTaskList({ groupId, taskListId, date }: TaskListProps) {
  if (!groupId || !taskListId || !date) return [];

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
  if (!groupId || !taskListId || !taskId) return [];

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
