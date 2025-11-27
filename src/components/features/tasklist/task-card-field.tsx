"use client";

import { useEffect, useState } from "react";
import Task, { KebabType } from "@/components/features/tasklist/task";
import { tabButtonStyle } from "@/app/(routes)/team/[id]/tasklist/index.styles";
import { GroupTaskList } from "@/types/tasklist";
import cn from "@/lib/cn";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import TaskDetailUpdateTemplate from "@/components/features/tasklist/task-recurring-update-modal";
import { updateRecurring, useDeleteRecurring, useTaskList } from "@/hooks/taskList/use-tasklist";
import { isEmpty } from "@/lib/utils";
import { useToggle } from "@/hooks";
import z4 from "zod/v4";
import { taskDetailUpdateSchema } from "@/lib/schema";
import { useAlert } from "@/providers/alert-provider";
import { useTaskListContext } from "@/app/(routes)/team/[id]/tasklist/[taskListId]/tasklist-provider";
import TaskDeleteSheet from "./task-recurring-delete-sheet";
import { DeleteType } from "@/types/task";

interface TaskListPageProps {
  groupData: GroupTaskList;
  date: string;
}

interface TaskFieldProps extends TaskListPageProps {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function TaskCardField({
  groupData,
  date,
  activeTab,
  setActiveTab,
}: TaskFieldProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

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
  const { mutate: updateMutate } = updateRecurring();
  const { mutate: deleteMutate } = useDeleteRecurring();

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null); // 카드 케밥용
  const [selectedRecurringId, setSelectedRecurringId] = useState<number | null>(null);

  const groupId = groupData.id;
  const tabs = groupData?.taskLists
    .sort((a, b) => a.displayIndex - b.displayIndex)
    .map(taskList => ({ id: taskList.id, label: taskList.name }));

  const { data: taskListData } = useTaskList({
    groupId: groupId,
    taskListId: activeTab,
    date: date,
    dateString: dateString,
  });

  if (taskListData) {
    if (taskListData.groupId !== groupData.id) {
      notFound();
    }
  }

  const handleTaskClick = (id: number) => {
    sessionStorage.setItem("taskId", id.toString()); // 상세보기 용
    const resultRecurringId = groupData?.taskLists
      .find(taskList => taskList.id === activeTab)
      ?.tasks.find(task => task.id === id)?.recurringId;
    sessionStorage.setItem("recurringId", resultRecurringId ? resultRecurringId.toString() : "");

    const params = new URLSearchParams(searchParams.toString());
    const dateParam = searchParams.get("date");
    params.set("date", dateParam ? dateParam : "");

    sessionStorage.setItem("openDetailModal", "true");
    router.push(`/team/${groupId}/tasklist/${activeTab}/${id}?${params.toString()}`);
  };

  const handleKebabClick = ({
    taskId,
    recurringId,
    type,
  }: {
    taskId: number;
    recurringId: number;
    type: KebabType;
  }) => {
    setSelectedTaskId(taskId);
    setSelectedRecurringId(recurringId);
    if (type === "update") {
      setOpenUpdateTaskDetail();
    } else {
      setOpenDeleteSheet();
    }
  };

  const handleTaskUpdateSubmit = async (
    value: z4.infer<ReturnType<typeof taskDetailUpdateSchema>>,
  ) => {
    if (selectedTaskId === null) return;

    const result = await permissionCheck();
    if (result) {
      updateMutate(
        {
          groupId: groupData.id,
          taskListId: activeTab,
          dateString: dateString,
          taskId: selectedTaskId,
          name: value.name,
        },
        {
          onSuccess: () => {
            showAlert("할 일 제목이 수정되었습니다."); // 나중에 toast로 교체
            setCloseUpdateTaskDetail();
          },
          onError: () => {
            showAlert("등록 중 오류가 발생했습니다.");
          },
        },
      );
    }
  };

  const handleClickDelete = async (type: DeleteType) => {
    if (selectedTaskId === null) {
      showAlert("선택된 할 일이 없습니다.");
      return;
    }

    const result = await permissionCheck();

    if (result) {
      if (type === "One") {
        deleteMutate(
          {
            groupId: groupData.id,
            taskListId: activeTab,
            dateString: dateString,
            taskId: selectedTaskId,
          },
          {
            onSuccess: () => {
              showAlert("할 일이 삭제 되었습니다."); // 나중에 toast로 교체
              setCloseDeleteSheet();

              const sessionTaskId = sessionStorage.getItem("taskId");
              if (sessionTaskId && Number(sessionTaskId) === selectedTaskId) {
                sessionStorage.setItem("closeDetailModal", "true");
                router.push(`/team/${groupId}/tasklist`);
              }
              router.refresh();
            },
            onError: () => {
              showAlert("삭제 중 오류가 발생했습니다.");
            },
          },
        );
      } else if (type === "All") {
        if (selectedRecurringId === null) {
          showAlert("선택된 할 일이 없습니다.");
          return;
        }

        deleteMutate(
          {
            groupId: groupData.id,
            taskListId: activeTab,
            dateString: dateString,
            taskId: selectedTaskId,
            recurringId: selectedRecurringId,
          },
          {
            onSuccess: () => {
              showAlert("할 일이 삭제 되었습니다."); // 나중에 toast로 교체
              setCloseDeleteSheet();

              const sessionTaskId = sessionStorage.getItem("taskId");
              if (sessionTaskId && Number(sessionTaskId) === selectedTaskId) {
                sessionStorage.setItem("closeDetailModal", "true");
                router.push(`/team/${groupId}/tasklist`);
              }
              router.refresh();
            },
            onError: () => {
              showAlert("삭제 중 오류가 발생했습니다.");
            },
          },
        );
      }
    }
  };

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);

    const params = new URLSearchParams(searchParams.toString());
    const dateParam = searchParams.get("date");
    params.set("date", dateParam ? dateParam : "");
    router.replace(`/team/${groupId}/tasklist/${tabId}?${params.toString()}`, {
      scroll: false,
    });
  };

  // 탭이동시 상세보기 화면 닫기
  useEffect(() => {
    sessionStorage.setItem("closeDetailModal", "true");
  }, [activeTab, router]);

  if (!activeTab || isEmpty(taskListData)) return null;

  return (
    <>
      <section>
        <div className="scroll-bar overflow-x flex gap-[12px]">
          {!isEmpty(tabs) &&
            tabs.map(tab => {
              return (
                <button
                  key={tab.id}
                  className={cn(
                    activeTab === tab.id
                      ? tabButtonStyle({ variant: "active" })
                      : tabButtonStyle({ variant: "inactive" }),
                    tabButtonStyle(),
                  )}
                  title={tab.label}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {tab.label}
                </button>
              );
            })}
        </div>
      </section>
      {taskListData ? (
        <section className="pb-[24px]">
          {taskListData.tasks.map(task => (
            <article
              key={task.id}
              className="mt-[16px] block w-full cursor-pointer"
              onClick={() => handleTaskClick(task.id)}
            >
              <Task task={task} onKebabClick={handleKebabClick} groupId={groupId} />
            </article>
          ))}
        </section>
      ) : (
        <section className="flex flex-1 items-center justify-center">
          <span className="text-body-s text-gray-500">
            아직 할 일 목록이 없습니다.
            <br />
            새로운 목록을 추가해주세요.
          </span>
        </section>
      )}

      {isOpenUpdateTaskDetail && (
        <TaskDetailUpdateTemplate
          isOpen={isOpenUpdateTaskDetail}
          onClose={setCloseUpdateTaskDetail}
          onSubmit={handleTaskUpdateSubmit}
          name={taskListData?.tasks.find(task => task.id === selectedTaskId)?.name ?? ""}
          type="nameOnly"
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
  );
}
