import Link from "next/link";
import cn from "@/lib/cn";
import { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToggle } from "@/hooks";
import { useAlert } from "@/providers/alert-provider";
import IcKebab from "@/assets/icons/ic-kebab.svg";
import Badge from "./badge";
import { Dropdown } from "@/components/ui";
import { TodoListProps } from "@/types/group";
import { todoListStyle, TODO_COLORS } from "./team.styles";
import { TodoListCreateModal } from "./modal/todo-create-modal";
import { TodoListEditModal } from "./modal/todo-edit-modal";
import deleteTodo from "@/api/team/delete-todo";
import { useToast } from "@/providers/toast-provider";
import { devConsoleError } from "@/lib/error";

export default function TodoList({ groupId, taskList = [] }: TodoListProps) {
  if (!taskList) return null;

  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const { showToast } = useToast();
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  const {
    isOpen: isCreateModalOpen,
    setOpen: setCreateModalOpen,
    setClose: setCreateModalClose,
  } = useToggle();

  const {
    isOpen: isEditModalOpen,
    setOpen: setEditModalOpen,
    setClose: setEditModalClose,
  } = useToggle();

  const handleEditModalClose = () => {
    setEditModalClose();
    setEditTaskId(null);
  };

  const colorChanger = (id: number) => {
    let colorIndex = id % TODO_COLORS.length;
    return TODO_COLORS[colorIndex];
  };

  const { mutate } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getGroups", groupId],
      });
      showToast("할 일 목록이 삭제되었습니다", "success");
    },
    onError: error => {
      showToast("할 일 목록 삭제에 문제가 발생했습니다.", "error");
      devConsoleError(error);
    },
  });

  const handleTodoDelete = useCallback(
    async (id: number, name: string) => {
      const message = `${name}을(를) 삭제하시겠습니까?`;
      const confirmed = await showAlert(message);
      if (confirmed) {
        mutate({ groupId, taskListId: id });
      }
    },
    [groupId],
  );

  return (
    <section className="mb-[48px] desktop:mb-[64px]">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <h3 className="inline-block text-[16px]">할 일 목록</h3>
          <span className="text-[16px] text-gray-500">({taskList.length}개)</span>
        </div>
        <button className="text-sm text-pink-400" onClick={setCreateModalOpen}>
          + 새로운 목록 추가하기
        </button>
      </div>
      {taskList &&
        taskList.map(task => (
          <div className={cn(todoListStyle, colorChanger(task.id))} key={task.id}>
            <Link className="grow" href={`/team/${groupId}/tasklist/${task.id}`}>
              <span className="text-sm">{task.name}</span>
            </Link>
            <div className="flex flex-none items-center">
              <Badge tasks={task.tasks} />
              <Dropdown intent="icon">
                <Dropdown.TriggerIcon>
                  <IcKebab className="h-4 w-4 text-gray-400" />
                </Dropdown.TriggerIcon>
                <Dropdown.Menu size="md">
                  <Dropdown.Option
                    align="center"
                    size="sm"
                    onClick={() => (setEditTaskId(task.id), setEditModalOpen())}
                  >
                    수정하기
                  </Dropdown.Option>
                  <Dropdown.Option
                    align="center"
                    size="sm"
                    onClick={() => handleTodoDelete(task.id, task.name)}
                  >
                    삭제하기
                  </Dropdown.Option>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {isEditModalOpen && editTaskId === task.id && (
              <TodoListEditModal
                isOpen={isEditModalOpen}
                groupId={groupId}
                taskListId={task.id}
                taskListName={task.name}
                onClose={handleEditModalClose}
              />
            )}
          </div>
        ))}
      {isCreateModalOpen && (
        <TodoListCreateModal
          isOpen={isCreateModalOpen}
          groupId={groupId}
          onClose={setCreateModalClose}
        />
      )}
    </section>
  );
}
