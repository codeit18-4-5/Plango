"use client";

import { Container } from "@/components/layout";
import LeftArrowIcon from "@/assets/icons/ic-arrow-left-circle.svg";
import RightArrowIcon from "@/assets/icons/ic-arrow-right-circle.svg";
import CalendarIcon from "@/assets/icons/ic-calendar-circle.svg";
import PlusIcon from "@/assets/icons/ic-plus.svg";
import { useRecurringMutation, useTaskListMutation } from "@/hooks/taskList/use-tasklist";
import { formatDateForToMonthAndDays, formatDateToISOString, isEmpty } from "@/lib/utils";
import { Button, Floating, SingleDatepicker } from "@/components/ui";
import { useToggle } from "@/hooks";
import TaskAddTemplate from "@/components/features/tasklist/task-add-modal";
import TaskRecurringAddModal from "@/components/features/tasklist/task-recurring/task-recurring-add-modal";
import { useEffect, useRef, useState } from "react";
import { useAlert } from "@/providers/alert-provider";
import { GroupTaskList } from "@/types/tasklist";
import { useRouter, useSearchParams } from "next/navigation";
import { taskDetailSchema, taskSchema } from "@/lib/schema";
import z4 from "zod/v4";
import { dateTitleStyle, hiddenBrStyle, newListbuttonStyle } from "../index.styles";
import { useTaskListContext } from "./tasklist-provider";
import TaskCardField from "@/components/features/tasklist/task-card-field";
import { useToast } from "@/providers/toast-provider";

interface TaskListPageProps {
  groupData: GroupTaskList;
  taskListId: string;
}

type ModalType = "task" | "recurring";
type ArrowType = "prev" | "next";

export default function TasklistClient({ groupData, taskListId }: TaskListPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    isOpen: isOpenCalendar,
    setOpen: setOpenCalendar,
    setClose: setCloseCalendar,
  } = useToggle();

  const { showAlert } = useAlert();
  const { showToast } = useToast();

  const {
    isTeam,
    isLoading,
    permissionCheck,
    dateString,
    currentISOStrDate,
    setCurrentISOStrDate,
  } = useTaskListContext();

  const { create: createRecurring } = useRecurringMutation();
  const { create: createTaskList } = useTaskListMutation();

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
  const [titleCurrentDate, setTitleCurrentDate] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);

  const calendarButtonRef = useRef<HTMLButtonElement>(null);
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const urlTaskListId = Number(taskListId);
    if (urlTaskListId !== activeTab) {
      setActiveTab(urlTaskListId);
    }
  }, [taskListId]);

  useEffect(() => {
    if (queryDate) {
      setCurrentISOStrDate(queryDate);
      setTitleCurrentDate(formatDateForToMonthAndDays(queryDate));
    } else {
      const today = new Date();
      today.setHours(10, 0, 0, 0);
      const initialDate = formatDateToISOString(today);

      const params = new URLSearchParams(searchParams.toString());
      params.set("date", initialDate);
      router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
      setCurrentISOStrDate(initialDate);
      setTitleCurrentDate(formatDateForToMonthAndDays(initialDate));
    }
  }, [queryDate, router, searchParams, setCurrentISOStrDate]);

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
        createTaskList.mutate(
          {
            groupId: groupData.id,
            name: resultValue,
          },
          {
            onSuccess: () => {
              showToast("할 일 목록이 등록되었습니다.", "success");
              setCloseTask();
              router.refresh();
            },
            onError: error => {
              console.error(error);
              showToast("등록 중 오류가 발생했습니다.", "error");
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
      createRecurring.mutate(
        {
          groupId: groupData.id,
          taskListId: activeTab,
          recurringData: value,
          dateString: dateString,
        },
        {
          onSuccess: () => {
            showToast("할 일이 등록되었습니다.", "success");
            setCloseRecurring();
          },
          onError: () => {
            showToast("등록 중 오류가 발생했습니다.", "error");
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

    setTitleCurrentDate(formatDateForToMonthAndDays(newDateStr));
  };

  const handleDateChange = (date: Date | null) => {
    if (date == null) return;
    setStartDate(date);

    const params = new URLSearchParams(searchParams.toString());
    params.set("date", formatDateToISOString(date));
    router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
    setCloseCalendar();
  };

  const handleTodayPickerClick = () => {
    handleDateChange(new Date());
  };

  useEffect(() => {
    if (!isOpenCalendar) return;

    const updateCalendarPos = () => {
      if (!calendarButtonRef.current) return;
      const rect = calendarButtonRef.current.getBoundingClientRect();
      setCalendarPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX - 150,
      });
    };

    updateCalendarPos();

    window.addEventListener("resize", updateCalendarPos);

    return () => {
      window.removeEventListener("resize", updateCalendarPos);
    };
  }, [isOpenCalendar]);

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
              <button
                ref={calendarButtonRef}
                className="w-[24px]"
                aria-label="캘린더 열기"
                onClick={setOpenCalendar}
              >
                <CalendarIcon />
              </button>
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
        <TaskAddTemplate
          isOpen={isOpenTask}
          onClose={setCloseTask}
          onSubmit={handleTaskSubmit}
          isPending={createTaskList.isPending}
        />
      )}

      {isOpenRecurring && (
        <TaskRecurringAddModal
          isOpen={isOpenRecurring}
          onClose={setCloseRecurring}
          isPending={createRecurring.isPending}
          onSubmit={handleTaskRecurringSubmit}
        />
      )}

      {isOpenCalendar && (
        <div
          className="fixed z-50"
          style={{
            top: `${calendarPosition.top}px`,
            left: `${calendarPosition.left}px`,
          }}
        >
          <div className="rounded-lg border border-pink-400 bg-gray-800 p-[10px] shadow-lg">
            <SingleDatepicker
              onSingleChange={date => handleDateChange(date)}
              startDate={startDate}
            />
            <Button className="h-[30px] w-full" onMouseDown={handleTodayPickerClick}>
              오늘 날짜 선택
            </Button>
          </div>
          <div className="fixed inset-0 -z-10" onClick={setCloseCalendar} />
        </div>
      )}
    </>
  );
}
