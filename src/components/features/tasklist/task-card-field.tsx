"use client";

import { useEffect, useState } from "react";
import Task, { KebabType } from "@/components/features/tasklist/task";
import { tabButtonStyle } from "@/app/(routes)/team/[id]/tasklist/index.styles";
import { GroupTaskList } from "@/types/tasklist";
import cn from "@/lib/cn";
import { notFound, useParams, useRouter, useSearchParams } from "next/navigation";
import TaskDetailUpdateTemplate from "@/components/features/tasklist/task-recurring/task-recurring-update-modal";
import {
  useRecurringMutation,
  useTaskList,
  useTaskListMutation,
} from "@/hooks/taskList/use-tasklist";
import { isEmpty } from "@/lib/utils";
import { useToggle } from "@/hooks";
import z4 from "zod/v4";
import { taskDetailUpdateSchema } from "@/lib/schema";
import { useAlert } from "@/providers/alert-provider";
import { useTaskListContext } from "@/app/(routes)/team/[id]/tasklist/[taskListId]/tasklist-provider";
import TaskDeleteSheet from "./task-recurring/task-recurring-delete-sheet";
import { DeleteType } from "@/types/task";
import useModalStore from "@/store/modal.store";
import SortableTask from "./sortable-task";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { TabsSkeleton, TaskListSkeleton } from "@/components/skeleton-ui/tasklist-skeleton";

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
  const { id: groupId, taskId } = useParams();
  const searchParams = useSearchParams();

  if (groupId == null) notFound();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const { openModal: openDetailModal, closeModal: closeDetailModal } = useModalStore();
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
  const { updateOrder } = useTaskListMutation();
  const { update: updateRecurring, remove: deleteRecurring } = useRecurringMutation();

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null); // 카드 케밥용
  const [selectedRecurringId, setSelectedRecurringId] = useState<number | null>(null);

  const tabs = groupData?.taskLists
    .sort((a, b) => a.displayIndex - b.displayIndex)
    .map(taskList => ({ id: taskList.id, label: taskList.name }));

  const { data: taskListData, isLoading: isLoadingTaskList } = useTaskList({
    groupId: Number(groupId),
    taskListId: activeTab,
    date: date,
    dateString: dateString,
  });

  if (taskListData) {
    if (taskListData?.groupId !== groupData.id) {
      notFound();
    }
  }

  const [tasks, setTasks] = useState(taskListData?.tasks || []);
  const [dragActiveId, setDragActiveId] = useState<number | null>(null);

  const handleTaskClick = (id: number) => {
    const resultRecurringId = groupData?.taskLists
      .find(taskList => taskList.id === activeTab)
      ?.tasks.find(task => task.id === id)?.recurringId;

    sessionStorage.setItem("recurringId", resultRecurringId ? resultRecurringId.toString() : "");

    const params = new URLSearchParams(searchParams.toString());
    const dateParam = searchParams.get("date");
    params.set("date", dateParam ? dateParam : "");

    openDetailModal();
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
      updateRecurring.mutate(
        {
          groupId: groupData.id,
          taskListId: activeTab,
          dateString: dateString,
          taskId: selectedTaskId,
          name: value.name,
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
    if (selectedTaskId === null) {
      showAlert("선택된 할 일이 없습니다.");
      return;
    }

    const result = await permissionCheck();

    if (result) {
      if (type === "One") {
        deleteRecurring.mutate(
          {
            groupId: groupData.id,
            taskListId: activeTab,
            dateString: dateString,
            taskId: selectedTaskId,
          },
          {
            onSuccess: () => {
              setCloseDeleteSheet();

              if (taskId && Number(taskId) === selectedTaskId) {
                closeDetailModal();

                const params = new URLSearchParams(searchParams.toString());
                const dateParam = searchParams.get("date");
                params.set("date", dateParam ? dateParam : "");
                router.push(`/team/${groupId}/tasklist/${activeTab}?${params.toString()}`);
              }
              router.refresh();
            },
          },
        );
      } else if (type === "All") {
        if (selectedRecurringId === null) {
          showAlert("선택된 할 일이 없습니다.");
          return;
        }

        deleteRecurring.mutate(
          {
            groupId: groupData.id,
            taskListId: activeTab,
            dateString: dateString,
            taskId: selectedTaskId,
            recurringId: selectedRecurringId,
          },
          {
            onSuccess: () => {
              setCloseDeleteSheet();

              if (taskId && Number(taskId) === selectedTaskId) {
                closeDetailModal();

                const params = new URLSearchParams(searchParams.toString());
                const dateParam = searchParams.get("date");
                params.set("date", dateParam ? dateParam : "");
                router.push(`/team/${groupId}/tasklist/${activeTab}?${params.toString()}`);
              }
              router.refresh();
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

  const handleDragStart = (event: DragStartEvent) => {
    const activeId = Number(event.active.id);
    setDragActiveId(activeId);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex(t => t.id === active.id);
      const newIndex = tasks.findIndex(t => t.id === over.id);

      const newOrder = arrayMove(tasks, oldIndex, newIndex);
      setTasks(newOrder);

      const orderPayload = newOrder.map((t, i) => ({ id: t.id, index: i }));

      updateOrder.mutate({
        groupId: groupData.id,
        taskListId: activeTab,
        dateString: dateString,
        taskId: Number(active.id),
        newIndex,
        orderPayload,
      });
    }
  };

  useEffect(() => {
    setTasks(taskListData?.tasks || []);
  }, [taskListData]);

  // 탭이동시 상세보기 화면 닫기
  useEffect(() => {
    closeDetailModal();
  }, [activeTab, router]);

  if (!activeTab) return null;

  return (
    <>
      <section>
        <div className="scroll-bar overflow-x flex gap-[12px]">
          {isLoadingTaskList ? (
            <TabsSkeleton />
          ) : (
            !isEmpty(tabs) &&
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
            })
          )}
        </div>
      </section>
      {isLoadingTaskList ? (
        <TaskListSkeleton />
      ) : taskListData ? (
        <section className="scroll-bar overflow-y-auto pb-[80px]">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={tasks.map(task => task.id)}>
              {tasks.map(task => (
                <article key={task.id} className="mt-[16px] block w-full cursor-pointer">
                  <SortableTask
                    task={task}
                    onKebabClick={handleKebabClick}
                    onClick={() => handleTaskClick(task.id)}
                  />
                </article>
              ))}
            </SortableContext>
            <DragOverlay>
              {dragActiveId &&
                (() => {
                  const activeTask = tasks.find(task => task.id === dragActiveId);
                  if (!activeTask) return null;

                  return (
                    <article className="mt-[16px] block w-full cursor-pointer">
                      <Task task={activeTask} onKebabClick={handleKebabClick} onClick={() => {}} />
                    </article>
                  );
                })()}
            </DragOverlay>
          </DndContext>
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
  );
}
