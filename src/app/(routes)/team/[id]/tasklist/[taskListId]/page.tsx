import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import TaskListClient from "./tasklist-client";
import { isEmpty } from "@/lib/utils";
import { notFound } from "next/navigation";
import { getGroupTaskListsforServer } from "@/api/tasklist/index-server";

export default async function TasklistPage({
  params,
}: {
  params: Promise<{ id: string; taskListId: string }>;
}) {
  const { id, taskListId } = await params;

  if (isEmpty(id) || isEmpty(taskListId)) {
    notFound();
  }

  const groupId = Number(id);
  const queryClient = new QueryClient();

  const groupResult = await getGroupTaskListsforServer(groupId);

  const existTaskList = groupResult.taskLists.some(taskList => taskList.id === Number(taskListId));
  if (!existTaskList) notFound();

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TaskListClient groupData={groupResult} taskListId={taskListId} />
      </HydrationBoundary>
    </>
  );
}
