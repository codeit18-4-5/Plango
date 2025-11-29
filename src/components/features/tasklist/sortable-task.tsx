import { Task as TaskType } from "@/types/task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Task from "@/components/features/tasklist/task";

interface SortableTaskProps {
  task: TaskType;
  onKebabClick: ({
    taskId,
    recurringId,
    type,
  }: {
    taskId: number;
    recurringId: number;
    type: KebabType;
  }) => void;
  onClick: () => void;
  dragActiveId: number | null;
}

type KebabType = "update" | "delete";

export default function SortableTask({
  task,
  onKebabClick,
  onClick,
  dragActiveId,
}: SortableTaskProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || (dragActiveId && dragActiveId !== task.id) ? "0.3" : "1",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Task task={task} onKebabClick={onKebabClick} onClick={onClick} />
    </div>
  );
}
