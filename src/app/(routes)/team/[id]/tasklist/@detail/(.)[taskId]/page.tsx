import TaskDetailWrapper from "@/components/features/tasklist/task-detail-wrapper";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ taskId: string; id: string }>;
}) {
  const { taskId, id } = await params;

  return <TaskDetailWrapper taskId={Number(taskId)} groupId={Number(id)} />;
}
