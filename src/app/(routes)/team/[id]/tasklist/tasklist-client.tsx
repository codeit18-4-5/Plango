"use client";

import { Container } from "@/components/layout";
import LeftArrowIcon from "@/assets/icons/ic-arrow-left-circle.svg";
import RightArrowIcon from "@/assets/icons/ic-arrow-right-circle.svg";
import CalendarIcon from "@/assets/icons/ic-calendar-circle.svg";
import PlusIcon from "@/assets/icons/ic-plus.svg";
import Task from "@/components/features/tasklist/task";
import { useTaskList } from "@/hooks/taskList/use-tasklist";
import { formatDateForToMonthAndDays, isEmpty } from "@/lib/utils";
import { Button, Floating } from "@/components/ui";
import { useToggle } from "@/hooks";
import TaskAddTemplate from "@/components/features/tasklist/task-add-modal";
import TaskRecurringAddModal from "@/components/features/tasklist/task-recurring-add-modal";
import { useEffect, useState } from "react";
import { useAlert } from "@/providers/alert-provider";
import { GroupTaskList } from "@/types/tasklist";
import cn from "@/lib/cn";
import { useRouter } from "next/navigation";
import { taskSchema } from "@/lib/schema";
import z4 from "zod/v4";
import { dateTitleStyle, hiddenBrStyle, newListbuttonStyle, tabButtonStyle } from "./index.styles";

interface TaskListPageProps {
  groupData: GroupTaskList;
  taskListId?: number | null;
  date: Date;
}

type ModalType = "task" | "recurring";

export default function TasklistClient({ groupData, taskListId, date }: TaskListPageProps) {
  const { isOpen: isOpenTask, setOpen: setOpenTask, setClose: setCloseTask } = useToggle();
  const {
    isOpen: isOpenRecurring,
    setOpen: setOpenRecurring,
    setClose: setCloseRecurring,
  } = useToggle();
  const { showAlert } = useAlert();

  const currentDateStr = formatDateForToMonthAndDays(date);

  const handleButtonClick = (type: ModalType) => {
    if (type === "task") {
      setOpenTask();
    } else if (type === "recurring") {
      if (!taskListId) {
        showAlert("할 일 그룹을 먼저 추가하여야 합니다.");
        return;
      }
      setOpenRecurring();
    }
  };

  const handleTaskSubmit = (value: string) => {
    console.log("tasklist 그룹 추가", value);
  };

  const handleTaskRecurringSubmit = (value: z4.infer<typeof taskSchema>) => {
    console.log("task 추가", value);
  };

  return (
    <>
      <Container className="h-full">
        <header className="mb-[24px]">
          <h1 className="text-heading-s text-gray-100">할 일</h1>{" "}
        </header>
        <main className="flex h-[95%] flex-col">
          <section className="mb-[24px] flex items-center justify-between">
            <div className="flex gap-[12px]">
              <span className={dateTitleStyle}>{`${currentDateStr}`}</span>
              <div className="flex gap-[4px]">
                <div className="w-[16px]">
                  <LeftArrowIcon></LeftArrowIcon>
                </div>
                <div className="w-[16px]">
                  <RightArrowIcon></RightArrowIcon>
                </div>
              </div>
              <div className="w-[24px]">
                <CalendarIcon />
              </div>
            </div>
            <button onClick={() => handleButtonClick("task")}>
              <span className={newListbuttonStyle}>
                + 새로운 목록 <br className={hiddenBrStyle} />
                추가하기
              </span>
            </button>
          </section>
          {!taskListId ? (
            <section className="flex flex-1 items-center justify-center">
              <span className="text-body-s text-gray-500">
                아직 할 일 목록이 없습니다.
                <br />
                새로운 목록을 추가해주세요.
              </span>
            </section>
          ) : (
            <TaskCardField taskListId={taskListId} groupData={groupData} date={date} />
          )}
        </main>
        <footer>
          <Floating>
            <Button shape="round" onClick={() => handleButtonClick("recurring")}>
              <div className="mr-[4px] w-[16px]">
                <PlusIcon />
              </div>
              <span className="text-body-m">할 일 추가</span>
            </Button>
          </Floating>
        </footer>
      </Container>

      {isOpenTask && (
        <TaskAddTemplate isOpen={isOpenTask} onClose={setCloseTask} onSubmit={handleTaskSubmit} />
      )}
      {isOpenRecurring && (
        <TaskRecurringAddModal
          isOpen={isOpenRecurring}
          onClose={setCloseRecurring}
          onSubmit={handleTaskRecurringSubmit}
        />
      )}
    </>
  );
}

function TaskCardField({ groupData, taskListId, date }: TaskListPageProps) {
  const router = useRouter();
  const groupId = groupData.id;
  const [activeTab, setActiveTab] = useState<number>(taskListId || 0);
  const tabs = groupData.taskLists
    .sort((a, b) => a.displayIndex - b.displayIndex)
    .map(taskList => ({ id: taskList.id, lable: taskList.name }));

  const { data: taskListData } = useTaskList({
    groupId: groupId,
    taskListId: activeTab,
    date: date.toISOString(),
  });

  const storageDatas = {
    taskGroupId: groupId.toString(),
    taskListId: activeTab,
    taskDate: date,
  };

  const handleTaskClick = (id: number) => {
    sessionStorage.setItem("taskStorageProps", JSON.stringify(storageDatas));
    router.push(`/team/${groupId}/tasklist/${id}`);
  };

  // 탭이동시 상세보기 화면 닫기
  useEffect(() => {
    const pathname = window.location.pathname;
    const pathParts = pathname.split("/").filter(Boolean);
    if (pathParts.length >= 4 && pathParts[2] === "tasklist") {
      router.back();
    }
  }, [activeTab, router]);

  if (!taskListId || isEmpty(taskListData)) return null;

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
                  title={tab.lable}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.lable}
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
              <Task task={task} />
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
    </>
  );
}
