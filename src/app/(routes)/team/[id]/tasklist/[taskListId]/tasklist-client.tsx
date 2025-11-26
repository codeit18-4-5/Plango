"use client";

import { Container } from "@/components/layout";
import LeftArrowIcon from "@/assets/icons/ic-arrow-left-circle.svg";
import RightArrowIcon from "@/assets/icons/ic-arrow-right-circle.svg";
import CalendarIcon from "@/assets/icons/ic-calendar-circle.svg";
import PlusIcon from "@/assets/icons/ic-plus.svg";
import { createRecurring, createTask } from "@/hooks/taskList/use-tasklist";
import { formatDateForToMonthAndDays, formatDateToISOString, isEmpty } from "@/lib/utils";
import { Button, Floating } from "@/components/ui";
import { useToggle } from "@/hooks";
import TaskAddTemplate from "@/components/features/tasklist/task-add-modal";
import TaskRecurringAddModal from "@/components/features/tasklist/task-recurring-add-modal";
import { useEffect, useState } from "react";
import { useAlert } from "@/providers/alert-provider";
import { GroupTaskList } from "@/types/tasklist";
import { useRouter, useSearchParams } from "next/navigation";
import { taskDetailSchema, taskSchema } from "@/lib/schema";
import z4 from "zod/v4";
import { dateTitleStyle, hiddenBrStyle, newListbuttonStyle } from "../index.styles";
import { useTaskListContext } from "./tasklist-provider";
import TaskCardField from "@/components/features/tasklist/task-card-field";

interface TaskListPageProps {
  groupData: GroupTaskList;
  taskListId: string;
}

type ModalType = "task" | "recurring";
type ArrowType = "prev" | "next";

export default function TasklistClient({ groupData, taskListId }: TaskListPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { showAlert } = useAlert();
  const {
    isTeam,
    isLoading,
    permissionCheck,
    dateString,
    currentISOStrDate,
    setCurrentISOStrDate,
  } = useTaskListContext();

  const { isOpen: isOpenTask, setOpen: setOpenTask, setClose: setCloseTask } = useToggle();
  const {
    isOpen: isOpenRecurring,
    setOpen: setOpenRecurring,
    setClose: setCloseRecurring,
  } = useToggle();

  const currentDate = new Date();
  currentDate.setHours(10, 0, 0, 0);

  const queryDate = searchParams.get("date");

  const [activeTab, setActiveTab] = useState<number | null>(Number(taskListId));

  useEffect(() => {
    let initialDate = queryDate;

    if (!queryDate) {
      const today = new Date();
      today.setHours(10, 0, 0, 0);
      initialDate = formatDateToISOString(today);

      const params = new URLSearchParams(searchParams.toString());
      params.set("date", initialDate);
      router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
      setCurrentISOStrDate(initialDate);
    }
  }, [queryDate, router, searchParams, setCurrentISOStrDate]);

  const [titleCurrentDate, setTitleCurrentDate] = useState("");

  useEffect(() => {
    setTitleCurrentDate(formatDateForToMonthAndDays(new Date(currentISOStrDate)));
  }, [currentISOStrDate]);

  const { mutate: postRecurringMutate } = createRecurring();
  const { mutate: taskMutate } = createTask();

  const handleButtonClick = (type: ModalType) => {
    if (type === "task") {
      setOpenTask();
    } else if (type === "recurring") {
      if (!activeTab) {
        showAlert("할 일 그룹을 먼저 추가하여야 합니다.");
        return;
      }
      setOpenRecurring();
    }
  };
  const handleTaskSubmit = async (value: z4.infer<typeof taskSchema>) => {
    const result = await permissionCheck();
    if (result) {
      const resultValue = value.name;
      if (isEmpty(resultValue))
        taskMutate(
          {
            groupId: groupData.id,
            name: resultValue,
          },
          {
            onSuccess: () => {
              showAlert("할 일 목록이 등록되었습니다."); // 나중에 toast로 교체
              setCloseTask();
              router.refresh();
            },
            onError: error => {
              console.error(error);
              showAlert("등록 중 오류가 발생했습니다.");
            },
          },
        );
    }
  };

  const handleTaskRecurringSubmit = async (value: z4.infer<typeof taskDetailSchema>) => {
    const result = await permissionCheck();

    if (!activeTab) {
      showAlert("할 일 목록을 먼저 선택하여야 합니다.");
      return;
    }

    if (result) {
      postRecurringMutate(
        {
          groupId: groupData.id,
          taskListId: activeTab,
          recurringData: value,
          dateString: dateString,
        },
        {
          onSuccess: () => {
            showAlert("할 일이 등록되었습니다."); // 나중에 toast로 교체
            setCloseRecurring();
          },
          onError: () => {
            showAlert("등록 중 오류가 발생했습니다.");
          },
        },
      );
    }
  };

  const handleArrowClick = (type: ArrowType) => {
    const currentDate = new Date(currentISOStrDate);
    let newDate: Date;
    newDate = currentDate;

    if (type === "prev") {
      newDate.setDate(newDate.getDate() - 1);
    } else if (type === "next") {
      newDate.setDate(newDate.getDate() + 1);
    }

    setCurrentISOStrDate(formatDateToISOString(newDate));

    const newDateStr = formatDateToISOString(newDate);
    setCurrentISOStrDate(newDateStr);

    const params = new URLSearchParams(searchParams.toString());
    params.set("date", newDateStr);
    router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (!isLoading && !isTeam) {
      showAlert("해당 팀에 권한이 없습니다.");
      router.push("/");
    }
  }, [isLoading, isTeam, router, showAlert]);

  return (
    <>
      <Container className="h-full">
        <header className="mb-[24px]">
          <h1 className="text-heading-s text-gray-100">할 일</h1>
        </header>
        <main className="flex h-[95%] flex-col">
          <section className="mb-[24px] flex items-center justify-between">
            <div className="flex gap-[12px]">
              <span className={dateTitleStyle}>{titleCurrentDate}</span>
              <div className="flex gap-[4px]">
                <button
                  className="w-[16px]"
                  aria-label="이전 날짜로 이동"
                  onClick={() => handleArrowClick("prev")}
                >
                  <LeftArrowIcon></LeftArrowIcon>
                </button>
                <button
                  className="w-[16px]"
                  aria-label="다음 날짜로 이동"
                  onClick={() => handleArrowClick("next")}
                >
                  <RightArrowIcon></RightArrowIcon>
                </button>
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
          {activeTab ? (
            <TaskCardField
              groupData={groupData}
              date={currentISOStrDate}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ) : (
            <section className="flex flex-1 items-center justify-center">
              <span className="text-body-s text-gray-500">
                아직 할 일 목록이 없습니다.
                <br />
                새로운 목록을 추가해주세요.
              </span>
            </section>
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
