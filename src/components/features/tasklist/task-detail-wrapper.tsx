"use client";
import CancelIcon from "@/assets/icons/ic-cancel.svg";
import { Container } from "@/components/layout";
import { useTaskDetail } from "@/hooks/taskList/use-tasklist";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import TaskDetailMain from "./task-detail-main";

export default function TaskDetailWrapper({
  taskId,
  groupId,
}: {
  taskId: number;
  groupId: number;
}) {
  const router = useRouter();

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

  return (
    <>
      {data ? (
        <Container>
          <header>
            <button className="mb-[16px] w-[24px]" onClick={handleCloseButton}>
              <CancelIcon stroke="var(--gray-500)" />
            </button>
          </header>
          <main>
            <TaskDetailMain taskDetail={data} />
          </main>
        </Container>
      ) : (
        <div>암것도 없어</div>
      )}
    </>
  );
}
