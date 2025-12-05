import cn from "@/lib/cn";
import { formatDateToFullStr } from "@/lib/utils";
import IcChecked from "@/assets/icons/ic-checked-color.svg";
import { UserHistory } from "@/types/user";
import { ReactNode } from "react";

type UserHistoryList = {
  tasksDone: UserHistory[];
};
type GroupedByDate = Record<string, UserHistory[]>;

// YYYY-MM-DD 날짜만 추출 해서 날짜별 그룹화
const groupByDate = (items: UserHistory[] = [], key: "doneAt" = "doneAt"): GroupedByDate => {
  return items?.reduce<GroupedByDate>((acc, item) => {
    const date = item[key].slice(0, 10);
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});
};

export default function HistoryList({ tasksDone }: UserHistoryList) {
  const grouped = groupByDate(tasksDone);
  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  return (
    <>
      {sortedDates.map(date => (
        <section className="mt-10 flex flex-col gap-4" key={date}>
          <h3
            className={cn(
              "text-center tracking-wider",
              "before:block before:translate-y-3 before:border before:border-gray-600 before:content-['']",
            )}
          >
            <span className="relative inline-block bg-black px-6 text-sm text-gray-400">
              {formatDateToFullStr({ date })}
            </span>
          </h3>
          <ul className="flex flex-col gap-4">
            {grouped[date].map(item => (
              <li
                key={item.id}
                className="flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-2.5"
              >
                <IcChecked className="h-6 w-6 flex-shrink-0" />
                <s className="text-gray-200">{item.name}</s>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

export function HistoryEmpty({ msg, children }: { msg: string; children?: ReactNode }) {
  return (
    <div className="full-scroll-h flex-1 content-center justify-items-center text-center">
      <p className="text-base text-gray-500">{msg}</p>
      {children}
    </div>
  );
}
