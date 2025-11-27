"use client";

import { Checkbox, Dropdown } from "@/components/ui";
import CommentIcon from "@/assets/icons/ic-comment.svg";
import KebabIcon from "@/assets/icons/ic-kebab.svg";
import CalendarIcon from "@/assets/icons/ic-calendar.svg";
import RepeatIcon from "@/assets/icons/ic-repeat.svg";
import { Task as TaskType } from "@/types/task";
import { formatDateToFullStr, getFrequencyLabel } from "@/lib/utils";
import { updateRecurringDoneAt } from "@/hooks/taskList/use-tasklist";
import { useTaskListContext } from "@/app/(routes)/team/[id]/tasklist/[taskListId]/tasklist-provider";
import { useToast } from "@/providers/toast-provider";

interface TaskProps {
  task: TaskType;
  groupId: number;
  onKebabClick: ({
    taskId,
    recurringId,
    type,
  }: {
    taskId: number;
    recurringId: number;
    type: KebabType;
  }) => void;
}

export type KebabType = "update" | "delete";

export default function Task({ task, groupId, onKebabClick }: TaskProps) {
  const { showToast } = useToast();

  const { mutate } = updateRecurringDoneAt();
  const { dateString } = useTaskListContext();
  const storedTaskListId = sessionStorage.getItem("taskListId");

  const handleKebabClick = (type: KebabType) => {
    onKebabClick({ taskId: task.id, recurringId: task.recurringId, type });
  };

  const handleCheckBoxChange = (done: boolean) => {
    if (!(groupId && storedTaskListId && dateString)) return;

    mutate(
      {
        groupId: groupId,
        taskListId: Number(storedTaskListId),
        dateString: dateString,
        taskId: task.id,
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

  return (
    <div className="flex h-[74px] w-full items-center justify-between rounded-lg bg-gray-800 py-[12px] pl-[14px] pr-[12px]">
      <div>
        <div className="mb-[10px] flex gap-[12px]">
          <Checkbox
            checked={task.doneAt ? true : false}
            onChange={done => handleCheckBoxChange(done)}
            label={task.name}
          ></Checkbox>
          <div className="flex items-center gap-[2px]">
            <div className="w-[16px]">
              <CommentIcon></CommentIcon>
            </div>
            <span className="text-body-xs text-gray-500">{task.commentCount}</span>
          </div>
        </div>
        <div className="flex gap-[10px]">
          <div className="flex gap-[7px]">
            <div className="w-[16px]">
              <CalendarIcon />
            </div>
            <span className="text-body-xs text-gray-500">
              {formatDateToFullStr({ date: task.date, type: "korean" })}
            </span>
          </div>
          <span className="text-body-xs text-gray-500">|</span>
          <div className="flex gap-[7px]">
            {task.frequency !== "ONCE" && (
              <div className="w-[16px]">
                <RepeatIcon />
              </div>
            )}
            <span className="text-body-xs text-gray-500">{getFrequencyLabel(task.frequency)}</span>
          </div>
        </div>
      </div>
      <div onClick={e => e.stopPropagation()}>
        <Dropdown>
          <Dropdown.TriggerIcon
            intent="icon"
            className="rounded px-[2px] py-[3px] hover:bg-gray-700"
          >
            <KebabIcon className="w-[16px]" />
          </Dropdown.TriggerIcon>
          <Dropdown.Menu size="md">
            <Dropdown.Option align="center" onClick={() => handleKebabClick("update")}>
              수정하기
            </Dropdown.Option>
            <Dropdown.Option align="center" onClick={() => handleKebabClick("delete")}>
              삭제하기
            </Dropdown.Option>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
