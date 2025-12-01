import { useState } from "react";
import { Modal, Input } from "@/components/ui";
import postTodo from "@/api/team/post-todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeamModalProps } from "../team.props";
import { useToast } from "@/providers/toast-provider";
import { devConsoleError } from "@/lib/error";

export const TodoListCreateModal = ({ isOpen, groupId, onClose }: TeamModalProps) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [todoName, setTodoName] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getGroups", groupId],
      });
      showToast("할 일 목록이 만들어졌습니다.", "success");
      onClose();
    },
    onError: error => {
      showToast("할일 목록 생성에 문제가 생겼습니다.", "error");
      devConsoleError(error);
    },
  });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.value;
    setTodoName(inputName);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ groupId, param: todoName });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form method="POST" onSubmit={handleSubmit}>
        <Modal.HeaderWithClose title="할 일 목록" />
        <Modal.Body>
          <Input id="todoName">
            <Input.Field
              className="mb-6"
              placeholder="목록 명을 입력해주세요."
              onChange={handleNameChange}
              value={todoName}
            />
          </Input>
        </Modal.Body>
        <Modal.FooterWithOnlyConfirm confirmButtonTitle="만들기" isSubmit disabled={isPending} />
      </form>
    </Modal>
  );
};
