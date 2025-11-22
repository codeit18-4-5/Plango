import TaskDetail from "@/components/features/tasklist/task-detail-page";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ taskId: string; id: string }>;
}) {
  const { taskId, id } = await params;

  return <TaskDetail taskId={Number(taskId)} groupId={Number(id)} />;
}
