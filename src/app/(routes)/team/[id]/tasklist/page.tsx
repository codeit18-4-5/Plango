import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import TaskListClient from "./tasklist-client";
import { formatDateToISOString, isEmpty } from "@/lib/utils";
import { redirect } from "next/navigation";
import { getGroupTaskListsforServer, getTaskListForServer } from "@/api/tasklist/index-server";

export default async function TasklistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (isEmpty(id)) {
    redirect("/");
  }

  const groupId = Number(id);
  const queryClient = new QueryClient();

  const groupResult = await getGroupTaskListsforServer(groupId);

  const currentDate = new Date();
  currentDate.setHours(10, 0, 0, 0);
  const dateString = formatDateToISOString(currentDate).split("T")[0];
  const formattedDate = formatDateToISOString(currentDate);

  let firstTaskListId: number | null = null;
  if (groupResult?.taskLists?.length) {
    const first = groupResult.taskLists.find(t => t.displayIndex === 0);
    if (first) {
      firstTaskListId = first.id;
    }
  }

  if (firstTaskListId !== null) {
    if (!isEmpty(firstTaskListId)) {
      await queryClient.prefetchQuery({
        queryKey: ["taskList", groupId, firstTaskListId, dateString],
        queryFn: () =>
          getTaskListForServer({
            groupId: groupId,
            taskListId: firstTaskListId,
            date: formattedDate,
          }),
      });
    }
  }

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TaskListClient groupData={groupResult} taskListId={firstTaskListId} date={currentDate} />
      </HydrationBoundary>
    </>
  );
}
