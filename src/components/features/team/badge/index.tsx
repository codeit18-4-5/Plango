import { useState, useEffect } from "react";
import { CircularProgressBar } from "@tomickigrzegorz/react-circular-progress-bar";
import IcDone from "@/assets/icons/ic-done.svg";
import { Task } from "@/types/task";
import { badgeChartProps } from "../team.props";

export default function Badge({ tasks }: { tasks: Task[] }) {
  const [done, setDone] = useState(0);

  useEffect(() => {
    const doneCount = tasks.filter(ts => ts.doneAt !== null).length;
    setDone(doneCount);
  }, [tasks]);

  const percent = Math.round((done / tasks.length) * 100);

  return (
    <div className="flex h-[25px] w-[58px] items-center justify-between rounded-xl bg-gray-900 px-2">
      {tasks.length === 0 || percent === 100 ? (
        <IcDone className="h-4 w-4" />
      ) : (
        <CircularProgressBar percent={percent} size={12} {...badgeChartProps} />
      )}
      <p className="text-pink-400">
        {done}/{tasks.length}
      </p>
    </div>
  );
}
