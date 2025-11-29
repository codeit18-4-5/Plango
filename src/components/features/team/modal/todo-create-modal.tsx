import { useState } from "react";
import { Modal, Input } from "@/components/ui";
import postTodo from "@/api/team/post-todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeamModalProps } from "../team.props";

export const TodoListCreateModal = ({ isOpen, groupId, onClose }: TeamModalProps) => {
  const queryClient = useQueryClient();

  const [todoName, setTodoName] = useState("");

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: postTodo,
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
    mutate({ groupId, param: todoName });
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
              placeholder="목록 명을 입력해주세요."
              onChange={handleNameChange}
              disabled={isPending}
            />
          </Input>
        </Modal.Body>
        <Modal.FooterWithOnlyConfirm confirmButtonTitle="만들기" isSubmit />
      </form>
    </Modal>
  );
};
