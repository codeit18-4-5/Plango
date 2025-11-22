// import TaskDetailModal from "@/components/features/tasklist/task-detail-modal";

export default async function TaskDetailModalPage({
  params,
}: {
  params: Promise<{ taskId: number }>;
}) {
  const { taskId } = await params;

  return <div>나중 페이지 들어감{taskId}</div>;
  // <TaskDetailModal taskId={Number(taskId)} />;
}
