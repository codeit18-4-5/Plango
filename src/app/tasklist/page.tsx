import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getTaskLists } from "@/api/tasklist";
import TaskListClient from "./tasklist-client";
import { isEmpty } from "@/lib/utils";

export default async function TasklistPage({
  groupId,
  taskIdList,
}: {
  groupId: number;
  taskIdList: number[];
}) {
  const currentDate = new Date().toISOString();
  const queryClient = new QueryClient();

  if (!isEmpty(taskIdList)) {
    await queryClient.prefetchQuery({
      queryKey: ["taskList", groupId, taskIdList],
      queryFn: () =>
        getTaskLists({
          groupId: Number(groupId),
          taskListId: taskIdList[0],
          date: currentDate,
        }),
    });
  }

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TaskListClient
          groupId={Number(groupId)}
          taskIdList={isEmpty(taskIdList) ? [] : taskIdList}
          date={currentDate}
        />
      </HydrationBoundary>
    </>
  );
}
