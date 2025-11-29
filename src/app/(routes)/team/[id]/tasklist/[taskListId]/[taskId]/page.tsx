import TaskDetailWrapper from "@/components/features/tasklist/task-detail/task-detail-wrapper";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ taskId: string; id: string }>;
}) {
  const { taskId, id } = await params;

  //모달 아님
  return <TaskDetailWrapper taskId={Number(taskId)} groupId={Number(id)} />;
}
