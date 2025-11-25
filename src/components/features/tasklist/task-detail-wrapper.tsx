"use client";
import CancelIcon from "@/assets/icons/ic-cancel.svg";
import { Container } from "@/components/layout";
import { updateRecurring, useTaskDetail } from "@/hooks/taskList/use-tasklist";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import TaskDetailMain from "./task-detail-main";
import { KebabType } from "./task";
import { useToggle } from "@/hooks";
import TaskDetailUpdateTemplate from "./task-recurring-update-modal";
import z4 from "zod/v4";
import { taskDetailUpdateSchema } from "@/lib/schema";
import { useTaskListContext } from "@/app/(routes)/team/[id]/tasklist/tasklist-provider";
import { useAlert } from "@/providers/alert-provider";

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
  const [selectedRecurringId, setSelectedRecurringId] = useState<number | null>(null);
  const { showAlert } = useAlert();
  const { permissionCheck, dateString } = useTaskListContext();
  const { mutate } = updateRecurring();

  const context = useMemo(() => {
    if (typeof window === "undefined") return null;

    const storageDatas = sessionStorage.getItem("taskStorageProps");
    if (!storageDatas) return null;

    try {
      const parsedData = JSON.parse(storageDatas);
      return {
        taskListId: Number(parsedData.taskListId),
        date: parsedData.taskDate,
        groupId: Number(parsedData.taskGroupId),
      };
    } catch {
      return null;
    }
  }, [taskId]);

  const handleKebabClick = ({ taskId, type }: { taskId: number; type: KebabType }) => {
    if (type === "update") {
      setSelectedRecurringId(taskId);
      setOpenUpdateTaskDetail();
    } else {
      console.log("delete:", taskId);
    }
  };

  useEffect(() => {
    if (!context || !taskId) {
      router.push("/");
    }
  }, [context, taskId, router]);

  const { data, isLoading } = useTaskDetail({
    groupId: groupId,
    taskListId: context?.taskListId ?? 0,
    taskId: taskId,
  });

  if (!context) {
    return <div className="p-4">로딩중...</div>;
  }

  if (isLoading) {
    return <div className="p-4">로딩중...</div>;
  }

  const handleCloseButton = () => {
    sessionStorage.setItem("closeDetailModal", "true");
    router.push(`/team/${groupId}/tasklist`);
  };

  const handleTaskUpdateSubmit = async (
    value: z4.infer<ReturnType<typeof taskDetailUpdateSchema>>,
  ) => {
    if (selectedRecurringId === null) return;

    const result = await permissionCheck();
    if (result) {
      mutate(
        {
          groupId: groupId,
          taskListId: context.taskListId,
          dateString: dateString,
          taskId: taskId,
          ...value,
        },
        {
          onSuccess: () => {
            showAlert("할 일 내용이 수정되었습니다."); // 나중에 toast로 교체
            setCloseUpdateTaskDetail();
          },
          onError: () => {
            showAlert("등록 중 오류가 발생했습니다.");
          },
        },
      );
    }
  };

  return (
    <>
      {data ? (
        <>
          <Container>
            <header>
              <button className="mb-[16px] w-[24px]" onClick={handleCloseButton}>
                <CancelIcon stroke="var(--gray-500)" />
              </button>
            </header>
            <main>
              <TaskDetailMain taskDetail={data} onKebabClick={handleKebabClick} />
            </main>
          </Container>

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
        </>
      ) : (
        <div>암것도 없어</div>
      )}
    </>
  );
}
