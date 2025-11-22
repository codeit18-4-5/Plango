import TaskDetailModal from "@/components/features/tasklist/task-detail-modal";

export default async function TaskDetailPage({ params }: { params: { taskId: string } }) {
  const { taskId } = await params;

  // 전체 페이지로 표시 (모달 아님)
  return (
    <div className="min-h-screen bg-gray-900">
      <TaskDetailModal taskId={Number(taskId)} />
    </div>
  );
}
