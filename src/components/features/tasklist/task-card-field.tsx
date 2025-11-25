"use client";

import { useEffect, useState } from "react";
import Task, { KebabType } from "@/components/features/tasklist/task";
import { tabButtonStyle } from "@/app/(routes)/team/[id]/tasklist/index.styles";
import { GroupTaskList } from "@/types/tasklist";
import cn from "@/lib/cn";
import { usePathname, useRouter } from "next/navigation";
import TaskDetailUpdateTemplate from "@/components/features/tasklist/task-recurring-update-modal";
import { updateRecurring, useTaskList } from "@/hooks/taskList/use-tasklist";
import { formatDateToISOString, isEmpty } from "@/lib/utils";
import { useToggle } from "@/hooks";
import z4 from "zod/v4";
import { taskDetailUpdateSchema } from "@/lib/schema";
import { useAlert } from "@/providers/alert-provider";
import { useTaskListContext } from "@/app/(routes)/team/[id]/tasklist/tasklist-provider";

interface TaskListPageProps {
  groupData: GroupTaskList;
  date: Date;
}

interface TaskFieldProps extends TaskListPageProps {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

export default function TaskCardField({
  groupData,
  date,
  activeTab,
  setActiveTab,
}: TaskFieldProps) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    isOpen: isOpenUpdateTaskDetail,
    setOpen: setOpenUpdateTaskDetail,
    setClose: setCloseUpdateTaskDetail,
  } = useToggle();

  const { showAlert } = useAlert();
  const { permissionCheck, dateString } = useTaskListContext();
  const { mutate } = updateRecurring();

  const [selectedRecurringId, setSelectedRecurringId] = useState<number | null>(null);

  const groupId = groupData.id;
  const tabs = groupData.taskLists
    .sort((a, b) => a.displayIndex - b.displayIndex)
    .map(taskList => ({ id: taskList.id, label: taskList.name }));

  const { data: taskListData } = useTaskList({
    groupId: groupId,
    taskListId: activeTab,
    date: formatDateToISOString(date),
    dateString: dateString,
  });

  const storageDatas = {
    taskGroupId: groupId.toString(),
    taskListId: activeTab,
    taskDate: date,
  };

  const handleTaskClick = (id: number) => {
    sessionStorage.setItem("taskStorageProps", JSON.stringify(storageDatas));
    sessionStorage.setItem("openDetailModal", "true");
    router.push(`/team/${groupId}/tasklist/${id}`);
  };

  const handleKebabClick = ({ taskId, type }: { taskId: number; type: KebabType }) => {
    if (type === "update") {
      setSelectedRecurringId(taskId);
      setOpenUpdateTaskDetail();
    } else {
      console.log("delete:", taskId);
    }
  };

  const handleTaskUpdateSubmit = async (
    value: z4.infer<ReturnType<typeof taskDetailUpdateSchema>>,
  ) => {
    if (selectedRecurringId === null) return;

    const result = await permissionCheck();
    if (result) {
      mutate(
        {
          groupId: groupData.id,
          taskListId: activeTab,
          dateString: dateString,
          taskId: selectedRecurringId,
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

  // 탭이동시 상세보기 화면 닫기
  useEffect(() => {
    const pathParts = pathname.split("/").filter(Boolean);
    if (pathParts.length >= 4 && pathParts[2] === "tasklist") {
      router.back();
    }
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
                  onClick={() => setActiveTab(tab.id)}
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
              <Task task={task} onKebabClick={handleKebabClick} />
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
          name={taskListData?.tasks.find(task => task.id === selectedRecurringId)?.name ?? ""}
          type="nameOnly"
        />
      )}
    </>
  );
}
