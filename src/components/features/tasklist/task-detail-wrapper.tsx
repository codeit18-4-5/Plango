"use client";
import CancelIcon from "@/assets/icons/ic-cancel.svg";
import { Container } from "@/components/layout";
import {
  updateRecurring,
  updateRecurringDoneAt,
  useDeleteRecurring,
  useTaskComments,
  useTaskDetail,
} from "@/hooks/taskList/use-tasklist";
import { useRouter } from "next/navigation";
import TaskDetailMain from "./task-detail-main";
import { KebabType } from "./task";
import { useToggle } from "@/hooks";
import TaskDetailUpdateTemplate from "./task-recurring-update-modal";
import z4 from "zod/v4";
import { taskDetailUpdateSchema } from "@/lib/schema";
import { useTaskListContext } from "@/app/(routes)/team/[id]/tasklist/[taskListId]/tasklist-provider";
import { useAlert } from "@/providers/alert-provider";
import TaskDeleteSheet from "./task-recurring-delete-sheet";
import { DeleteType } from "@/types/task";
import { Button, Floating } from "@/components/ui";
import CheckIcon from "@/assets/icons/ic-check.svg";
import CheckColorIcon from "@/assets/icons/ic-check-color.svg";
import { useToast } from "@/providers/toast-provider";

export default function TaskDetailWrapper({
  taskId,
  groupId,
}: {
  taskId: number;
  groupId: number;
}) {
  const router = useRouter();

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

  const { showToast } = useToast();
  const { showAlert } = useAlert();
  const { permissionCheck, dateString } = useTaskListContext();

  const { data: commentsData } = useTaskComments(taskId);
  const { mutate: updateMutate } = updateRecurring();
  const { mutate: deleteMutate } = useDeleteRecurring();
  const { mutate: updateRecurringDoneMutate } = updateRecurringDoneAt();

  const storedTaskListId = sessionStorage.getItem("taskListId");
  const storedRecurringId = sessionStorage.getItem("recurringId");

  if (storedTaskListId == null || storedRecurringId == null) {
    return <div className="p-4">로딩중...</div>;
  }

  const taskListId = Number(storedTaskListId);
  const recurringId = Number(storedRecurringId);

  const handleKebabClick = (type: KebabType) => {
    if (type === "update") {
      setOpenUpdateTaskDetail();
    } else {
      setOpenDeleteSheet();
    }
  };

  const { data, isLoading } = useTaskDetail({
    groupId: groupId,
    taskListId: taskListId,
    taskId: taskId,
  });

  const handleCloseButton = () => {
    sessionStorage.setItem("closeDetailModal", "true");
    router.push(`/team/${groupId}/tasklist/${taskListId}`);
  };

  const handleTaskUpdateSubmit = async (
    value: z4.infer<ReturnType<typeof taskDetailUpdateSchema>>,
  ) => {
    if (taskId === null) return;

    const result = await permissionCheck();
    if (result) {
      updateMutate(
        {
          groupId: groupId,
          taskListId: taskListId,
          dateString: dateString,
          taskId: taskId,
          ...value,
        },
        {
          onSuccess: () => {
            showToast("할 일 내용이 수정되었습니다.", "success");
            setCloseUpdateTaskDetail();
          },
          onError: () => {
            showToast("등록 중 오류가 발생했습니다.", "error");
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
        deleteMutate(
          {
            groupId: groupId,
            taskListId: taskListId,
            dateString: dateString,
            taskId: taskId,
          },
          {
            onSuccess: () => {
              showToast("할 일이 삭제 되었습니다.", "success");
              setCloseDeleteSheet();

              sessionStorage.setItem("closeDetailModal", "true");
              router.push(`/team/${groupId}/tasklist`);
            },
            onError: () => {
              showToast("삭제 중 오류가 발생했습니다.", "error");
            },
          },
        );
      } else if (type === "All") {
        if (taskId === null) {
          showAlert("선택된 할 일이 없습니다.");
          return;
        }

        deleteMutate(
          {
            groupId: groupId,
            taskListId: taskListId,
            dateString: dateString,
            taskId: taskId,
            recurringId: recurringId,
          },
          {
            onSuccess: () => {
              showToast("할 일이 삭제 되었습니다.", "success");
              setCloseDeleteSheet();

              sessionStorage.setItem("closeDetailModal", "true");
              router.push(`/team/${groupId}/tasklist`);
            },
            onError: () => {
              showToast("삭제 중 오류가 발생했습니다.", "error");
            },
          },
        );
      }
    }
  };

  const hanelDoneButtonClick = (doneAt: string | null) => {
    const done = doneAt ? false : true;
    updateRecurringDoneMutate(
      {
        groupId: groupId,
        taskListId: taskListId,
        dateString: dateString,
        taskId: taskId,
        done: done,
      },
      {
        onSuccess: () => {},
        onError: () => {
          showToast("등록 중 오류가 발생했습니다.", "error");
        },
      },
    );
  };

  if (isLoading) {
    return <div className="p-4">로딩중..ㄹㄹㄹ</div>;
  }

  return (
    <>
      {data ? (
        <>
          <Container className="h-full">
            <header>
              <button className="mb-[16px] w-[24px]" onClick={handleCloseButton}>
                <CancelIcon stroke="var(--gray-500)" />
              </button>
            </header>
            <main className="flex h-full flex-col">
              <TaskDetailMain
                taskDetail={data}
                onKebabClick={handleKebabClick}
                commentsData={commentsData ?? []}
              />
            </main>
          </Container>
          <Floating>
            <Button
              shape="round"
              intent={data.doneAt ? "secondary" : "primary"}
              onClick={() => hanelDoneButtonClick(data.doneAt)}
            >
              <div className="w-[16px]">{data.doneAt ? <CheckColorIcon /> : <CheckIcon />}</div>
              <span className={data.doneAt ? "text-pink-400" : ""}>완료하기</span>
            </Button>
          </Floating>

          {isOpenUpdateTaskDetail && (
            <TaskDetailUpdateTemplate
              isOpen={isOpenUpdateTaskDetail}
              onClose={setCloseUpdateTaskDetail}
              onSubmit={handleTaskUpdateSubmit}
              name={data.name}
              description={data.description ?? ""}
              type="nameAndDescription"
            />
          )}

          {isOpenDeleteSheet && (
            <TaskDeleteSheet
              isOpen={isOpenDeleteSheet}
              onClose={setCloseDeleteSheet}
              onDelete={handleClickDelete}
            />
          )}
        </>
      ) : (
        <div>암것도 없어</div>
      )}
    </>
  );
}
