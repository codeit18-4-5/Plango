import { useState } from "react";
import { Modal, Input } from "@/components/ui";
import patchTodo from "@/api/team/patch-todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoEditProps } from "../team.props";
import { useToast } from "@/providers/toast-provider";
import { useAlert } from "@/providers/alert-provider";
import { devConsoleError } from "@/lib/error";

export const TodoListEditModal = ({
  isOpen,
  groupId,
  onClose,
  taskListId,
  taskListName,
}: TodoEditProps) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { showAlert } = useAlert();

  const [todoName, setTodoName] = useState(taskListName);

  const { mutate, isPending } = useMutation({
    mutationFn: patchTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getGroups", groupId],
      });
      showToast("할 일 목록이 수정되었습니다.", "success");
      onClose();
    },
    onError: error => {
      showToast("할 일 목록 수정에 문제가 생겼습니다.", "error");
      devConsoleError(error);
    },
  });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.value;
    setTodoName(inputName);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todoName) {
      showAlert("할 일 목록의 제목은 공란일 수 없습니다.");
      return;
    }
    if (todoName.length > 30) {
      showAlert("할 일 목록의 제목은 최대 30자 입니다.");
      return;
    }

    mutate({ groupId, taskListId, name: todoName });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form method="POST" onSubmit={handleSubmit}>
        <Modal.HeaderWithClose title="할 일 목록" />
        <Modal.Body>
          <Input id="todoName">
            <Input.Field
              className="mb-6"
              onChange={handleNameChange}
              value={todoName}
              maxLength="30"
              autoComplete="off"
            />
          </Input>
        </Modal.Body>
        <Modal.FooterWithOnlyConfirm confirmButtonTitle="수정하기" isSubmit disabled={isPending} />
      </form>
    </Modal>
  );
};
