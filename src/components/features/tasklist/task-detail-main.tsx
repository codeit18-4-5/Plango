import KebabIcon from "@/assets/icons/ic-kebab.svg";
import { Avatar } from "@/components/ui";
import { formatDateToFullStr, formatTimeToStr, getFrequencyLabel } from "@/lib/utils";
import CalendarIcon from "@/assets/icons/ic-calendar.svg";
import RepeatIcon from "@/assets/icons/ic-repeat.svg";
import TimeIcon from "@/assets/icons/ic-time.svg";
import { TaskDetail } from "@/types/task";

interface TaskDetailProps {
  taskDetail: TaskDetail;
}

export default function TaskDetailMain({ taskDetail }: TaskDetailProps) {
  return (
    <>
      <div className="mb-[16px] flex justify-between">
        <h1 className="text-heading-s text-gray-100">{taskDetail.name}</h1>
        <button className="w-[24px]">
          <KebabIcon fill="var(--gray-500)" />
        </button>
      </div>
      <div className="mb-[16px] flex items-center justify-between">
        <div className="flex items-center gap-[12px]">
          <Avatar className="w-[32px]" image={taskDetail.writer.image} />
          <span className="text-body-s text-gray-100">{taskDetail.writer.nickname}</span>
        </div>
        <span className="text-body-s text-gray-300">
          {formatDateToFullStr({ date: taskDetail.date, type: "korean" })}
        </span>
      </div>
      <div className="mb-[24px] flex gap-[10px]">
        <div className="flex gap-[7px]">
          <div className="w-[16px]">
            <CalendarIcon />
          </div>
          <span className="text-body-xs text-gray-500">
            {formatDateToFullStr({ date: taskDetail.date, type: "korean" })}
          </span>
        </div>
        <span className="text-body-xs text-gray-500">|</span>
        <div className="flex gap-[7px]">
          <div className="w-[16px]">
            <TimeIcon fill="var(--gray-500)" />
          </div>
          <span className="text-body-xs text-gray-500">
            {formatTimeToStr({ date: taskDetail.date, type: "meridiem" })}
          </span>
        </div>
        <span className="text-body-xs text-gray-500">|</span>
        <div className="flex gap-[7px]">
          {taskDetail?.frequency !== "ONCE" && (
            <div className="w-[16px]">
              <RepeatIcon />
            </div>
          )}
          <span className="text-body-xs text-gray-500">
            {getFrequencyLabel(taskDetail.frequency)}
          </span>
        </div>
      </div>
      <div className="">{taskDetail.description && <p>{taskDetail.description}</p>}</div>
    </>
  );
}
