import TaskDetailModal from "@/components/features/tasklist/task-detail-modal";

export default async function TaskDetailModalPage({
  params,
}: {
  params: Promise<{ taskId: number }>;
}) {
  const { taskId } = await params;

  return <TaskDetailModal taskId={Number(taskId)} />;
}
