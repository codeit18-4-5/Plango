// import TaskDetailWrapper from "@/components/features/tasklist/task-detail-wrapper";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ taskId: string; id: string }>;
}) {
  const { taskId, id } = await params;

  //모달 아님
  return <h1>{taskId + id}</h1>;
  // <TaskDetailWrapper taskId={Number(taskId)} groupId={Number(id)} />;
}
