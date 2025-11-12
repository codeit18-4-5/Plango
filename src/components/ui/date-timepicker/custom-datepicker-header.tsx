import ArrowIcon from "@/assets/icons/ic-calendar-arrow.svg";

export default function renderCustomHeader({
  date,
  decreaseMonth,
  increaseMonth,
}: {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
}) {
  const monthYear = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    timeZone: "Asia/Seoul",
  });

  return (
    <div className="flex items-center justify-between px-2">
      <button
        type="button"
        onClick={decreaseMonth}
        className="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-700"
      >
        <div className="w-[24px]">
          <ArrowIcon className="rotate-90" />
        </div>
      </button>
      <div className="text-fs-body-s">{monthYear}</div>
      <button
        type="button"
        onClick={increaseMonth}
        className="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-700"
      >
        <div className="w-[24px]">
          <ArrowIcon className="-rotate-90" />
        </div>
      </button>
    </div>
  );
}
