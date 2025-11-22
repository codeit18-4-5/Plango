import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import TaskListClient from "./tasklist-client";
import { isEmpty } from "@/lib/utils";
import { GroupTaskList } from "@/types/tasklist";
import { redirect } from "next/navigation";
import { getGroupTaskListsforServer, getTaskListForServer } from "@/api/tasklist/index-server";

export default async function TasklistPage({ groupId }: { groupId: number }) {
  if (isEmpty(groupId)) {
    redirect("/");
  }

  const queryClient = new QueryClient();

  const groupResult: GroupTaskList = await queryClient.fetchQuery({
    queryKey: ["taskList", groupId],
    queryFn: () => getGroupTaskListsforServer(groupId),
  });

  const currentDate = new Date();

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
        queryKey: ["taskList", groupId, firstTaskListId, currentDate],
        queryFn: () =>
          getTaskListForServer({
            groupId: Number(groupId),
            taskListId: firstTaskListId,
            date: currentDate.toString(),
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
