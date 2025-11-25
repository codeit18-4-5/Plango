"use client";

import { Checkbox, Dropdown } from "@/components/ui";
import CommentIcon from "@/assets/icons/ic-comment.svg";
import KebabIcon from "@/assets/icons/ic-kebab.svg";
import CalendarIcon from "@/assets/icons/ic-calendar.svg";
import RepeatIcon from "@/assets/icons/ic-repeat.svg";
import { Task as TaskType } from "@/types/task";
import { useState } from "react";
import { formatDateToFullStr, getFrequencyLabel } from "@/lib/utils";

interface TaskProps {
  task: TaskType;
  onKebabClick: ({ taskId, type }: { taskId: number; type: KebabType }) => void;
}

export type KebabType = "update" | "delete";

export default function Task({ task, onKebabClick }: TaskProps) {
  const [checked, setChecked] = useState(false);

  const handleKebabClick = (type: KebabType) => {
    onKebabClick({ taskId: task.id, type });
  };

  return (
    <div className="flex h-[74px] w-full items-center justify-between rounded-lg bg-gray-800 py-[12px] pl-[14px] pr-[12px]">
      <div>
        <div className="mb-[10px] flex gap-[12px]">
          <Checkbox checked={checked} onChange={setChecked} label={task.name}></Checkbox>
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
      <div onClick={e => e.stopPropagation()} className="rounded px-[2px] hover:bg-gray-700">
        <Dropdown>
          <Dropdown.TriggerIcon intent="icon">
            <KebabIcon className="mt-[5px] w-[16px]" />
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
