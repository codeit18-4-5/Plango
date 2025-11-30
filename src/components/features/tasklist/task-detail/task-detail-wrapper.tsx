"use client";
import CancelIcon from "@/assets/icons/ic-cancel.svg";
import { Container } from "@/components/layout";
import { useRecurring, useRecurringMutation, useTaskComments } from "@/hooks/taskList/use-tasklist";
import { notFound, useParams, useRouter, useSearchParams } from "next/navigation";
import TaskDetailMain from "./task-detail-main";
import { KebabType } from "../task";
import { useToggle } from "@/hooks";
import TaskDetailUpdateTemplate from "../task-recurring/task-recurring-update-modal";
import z4 from "zod/v4";
import { taskDetailUpdateSchema } from "@/lib/schema";
import { useTaskListContext } from "@/app/(routes)/team/[id]/tasklist/[taskListId]/tasklist-provider";
import { useAlert } from "@/providers/alert-provider";
import TaskDeleteSheet from "../task-recurring/task-recurring-delete-sheet";
import { DeleteType } from "@/types/task";
import { Button, Floating } from "@/components/ui";
import CheckIcon from "@/assets/icons/ic-check.svg";
import CheckColorIcon from "@/assets/icons/ic-check-color.svg";
import useModalStore from "@/store/modal.store";

export default function TaskDetailWrapper({
  taskId,
  groupId,
}: {
  taskId: number;
  groupId: number;
}) {
  const router = useRouter();
  const { taskListId: taskListIdParam } = useParams();
  const searchParams = useSearchParams();

  if (taskListIdParam == null) notFound();

  const { closeModal: closeDetailModal } = useModalStore();
  const {
    isOpen: isOpenUpdateTaskDetail,
    setOpen: setOpenUpdateTaskDetail,
    setClose: setCloseUpdateTaskDetail,
  } = useToggle();
  const {
    isOpen: isOpenDeleteSheet,
    setOpen: setOpenDeleteSheet,
    setClose: setCloseDeleteSheet,
  } = useToggle();

  const { showAlert } = useAlert();
  const { permissionCheck, dateString } = useTaskListContext();

  const { data: commentsData } = useTaskComments(taskId);
  const { data: recurringData } = useRecurring({
    groupId,
    taskListId: Number(taskListIdParam),
    taskId,
  });
  const {
    update: updateRecurring,
    remove: deleteRecurring,
    updateDoneAt: updateRecurringDoneAt,
  } = useRecurringMutation();

  const taskListId = Number(taskListIdParam);
  const storedRecurringId = sessionStorage.getItem("recurringId");

  if (storedRecurringId == null) {
    return <div className="p-4">로딩중...</div>;
  }

  const recurringId = Number(storedRecurringId);

  const handleKebabClick = (type: KebabType) => {
    if (type === "update") {
      setOpenUpdateTaskDetail();
    } else {
      setOpenDeleteSheet();
    }
  };

  const handleCloseButton = () => {
    closeDetailModal();
    const params = new URLSearchParams(searchParams.toString());
    const dateParam = searchParams.get("date");
    params.set("date", dateParam ? dateParam : "");
    router.push(`/team/${groupId}/tasklist/${taskListId}?${params.toString()}`);
  };

  const handleTaskUpdateSubmit = async (
    value: z4.infer<ReturnType<typeof taskDetailUpdateSchema>>,
  ) => {
    if (taskId === null) return;

    const result = await permissionCheck();
    if (result) {
      updateRecurring.mutate(
        {
          groupId: groupId,
          taskListId: taskListId,
          dateString: dateString,
          taskId: taskId,
          ...value,
        },
        {
          onSuccess: () => {
            setCloseUpdateTaskDetail();
          },
        },
      );
    }
  };

  const handleClickDelete = async (type: DeleteType) => {
    if (taskId === null) {
      showAlert("선택된 할 일이 없습니다.");
      return;
    }

    const result = await permissionCheck();

    if (result) {
      if (type === "One") {
        deleteRecurring.mutate(
          {
            groupId: groupId,
            taskListId: taskListId,
            dateString: dateString,
            taskId: taskId,
          },
          {
            onSuccess: () => {
              setCloseDeleteSheet();
              closeDetailModal();
              router.push(`/team/${groupId}/tasklist`);
            },
          },
        );
      } else if (type === "All") {
        if (taskId === null) {
          showAlert("선택된 할 일이 없습니다.");
          return;
        }

        deleteRecurring.mutate(
          {
            groupId: groupId,
            taskListId: taskListId,
            dateString: dateString,
            taskId: taskId,
            recurringId: recurringId,
          },
          {
            onSuccess: () => {
              setCloseDeleteSheet();
              closeDetailModal();
              router.push(`/team/${groupId}/tasklist`);
            },
          },
        );
      }
    }
  };

  const handleDoneButtonClick = (doneAt: string | null) => {
    const done = doneAt ? false : true;
    updateRecurringDoneAt.mutate({
      groupId: groupId,
      taskListId: taskListId,
      dateString: dateString,
      taskId: taskId,
      done: done,
    });
  };

  return (
    <>
      {recurringData ? (
        <>
          <Container className="h-full">
            <header>
              <button className="mb-[16px] w-[24px]" onClick={handleCloseButton}>
                <CancelIcon stroke="var(--gray-500)" />
              </button>
            </header>
            <main className="flex h-full flex-col">
              <TaskDetailMain
                taskDetail={recurringData}
                onKebabClick={handleKebabClick}
                commentsData={commentsData ?? []}
              />
            </main>
          </Container>
          <Floating>
            <Button
              shape="round"
              intent={recurringData.doneAt ? "secondary" : "primary"}
              onClick={() => handleDoneButtonClick(recurringData.doneAt)}
            >
              <div className="w-[16px]">
                {recurringData.doneAt ? <CheckColorIcon /> : <CheckIcon />}
              </div>
              <span className={recurringData.doneAt ? "text-pink-400" : ""}>완료하기</span>
            </Button>
          </Floating>

          {isOpenUpdateTaskDetail && (
            <TaskDetailUpdateTemplate
              isOpen={isOpenUpdateTaskDetail}
              onClose={setCloseUpdateTaskDetail}
              onSubmit={handleTaskUpdateSubmit}
              name={recurringData.name}
              description={recurringData.description ?? ""}
              type="nameAndDescription"
              isPending={updateRecurring.isPending}
            />
          )}

          {isOpenDeleteSheet && (
            <TaskDeleteSheet
              isOpen={isOpenDeleteSheet}
              onClose={setCloseDeleteSheet}
              onDelete={handleClickDelete}
              isPending={deleteRecurring.isPending}
            />
          )}
        </>
      ) : (
        <div>암것도 없어</div>
      )}
    </>
  );
}
