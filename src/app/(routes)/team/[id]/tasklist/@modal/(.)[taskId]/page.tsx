import TaskDetailModal from "@/components/features/tasklist/task-detail-modal";

export default async function TaskDetailModalPage({
  params,
}: {
  params: Promise<{ taskId: string; id: string }>;
}) {
  const { taskId, id } = await params;

  return <TaskDetailModal taskId={Number(taskId)} groupId={Number(id)} />;
}
