import Image from "next/image";
import { TaskList } from "@/types/tasklist";
import { CircularProgressBar } from "@tomickigrzegorz/react-circular-progress-bar";
import { reportChartProps } from "./team.props";
import { reportText, reportRightBox } from "./team.styles";
import cn from "@/lib/cn";

export default function TeamReport({ taskLists = [] }: { taskLists: TaskList[] }) {
  const totalTasks = taskLists.reduce((acc, list) => {
    return acc + list.tasks.length;
  }, 0);

  const doneTasks = taskLists.reduce(
    (acc, list) => acc + list.tasks.filter(task => task.doneAt !== null).length,
    0,
  );

  const percent = totalTasks > 0 ? (doneTasks / totalTasks) * 100 : 0;

  return (
    <section className="mb-[48px] desktop:mb-[64px]">
      <h3 className="text-[16px]">리포트</h3>
      <div className="mt-[16px] flex w-full min-w-[343px] justify-between gap-3 rounded-xl bg-gray-800 p-6">
        <div className="flex items-center justify-between gap-[40px]">
          <div className="relative w-[130px] tablet:w-[180px]">
            <CircularProgressBar id={1} percent={percent} {...reportChartProps} />
            <div className="absolute bottom-[30%] right-[32%] tablet:hidden">
              <p className="text-center text-xs">오늘</p>
              <p className={cn("text-xl font-bold", reportText)}>{percent}%</p>
            </div>
          </div>
          <span className="hidden text-white tablet:block">
            오늘의 <br />
            진행상황
            <p className={cn("text-[40px] font-bold", reportText)}>{percent}%</p>
          </span>
        </div>
        <div className="flex flex-col gap-4 tablet:w-[280px] desktop:w-[400px]">
          <div className={reportRightBox.wrapper}>
            <div>
              <p className={reportRightBox.textxs}>오늘의 할 일</p>
              <p className={reportRightBox.text2xl}>{totalTasks}개</p>
            </div>
            <Image src="/assets/images/img-todo.svg" alt="" width={40} height={40} />
          </div>
          <div className={reportRightBox.wrapper}>
            <div>
              <p className={reportRightBox.textxs}>완료한 일</p>
              <p className={reportRightBox.text2xl}>{doneTasks}개</p>
            </div>
            <Image src="/assets/images/img-done.svg" alt="" width={40} height={40} />
          </div>
        </div>
      </div>
    </section>
  );
}
