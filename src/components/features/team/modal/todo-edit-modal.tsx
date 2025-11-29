import { useState } from "react";
import { Modal, Input } from "@/components/ui";
import patchTodo from "@/api/team/patch-todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoEditProps } from "../team.props";

export const TodoListEditModal = ({
  isOpen,
  groupId,
  onClose,
  taskListId,
  taskListName,
}: TodoEditProps) => {
  const queryClient = useQueryClient();

  const [todoName, setTodoName] = useState(taskListName);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: patchTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getGroups", groupId],
      });
      onClose();
    },
    onError: error => {
      console.log(error, error.message);
    },
  });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.value;
    setTodoName(inputName);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todoName) {
      alert("할 일 목록의 제목은 공란일 수 없습니다.");
      return;
    }

    mutate({ groupId, taskListId, name: todoName });
  };

  if (isSuccess) onClose();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form method="POST" onSubmit={handleSubmit}>
        <Modal.HeaderWithClose title="할 일 목록" />
        <Modal.Body>
          <Input id="todoName">
            <Input.Field
              className="mb-6"
              onChange={handleNameChange}
              disabled={isPending}
              value={todoName}
            />
          </Input>
        </Modal.Body>
        <Modal.FooterWithOnlyConfirm confirmButtonTitle="수정하기" isSubmit />
      </form>
    </Modal>
  );
};
