"use client";

import Datepicker from "react-datepicker";
import { useDatepickerDate } from "@/hooks/use-datepicker-date";
import CustomHeader from "./custom-datepicker-header";
import { cuttingDayString, otherMonthIndicator } from "@/lib/utils";

interface CustomSingleDatepickerProps {
  startDate: Date | null;
  onSingleChange?: (date: Date | null) => void;
}

export default function CustomSingleDatepicker({
  startDate,
  onSingleChange,
}: CustomSingleDatepickerProps) {
  const { currentMonth, currentYear, handleMonthChange } = useDatepickerDate();

  return (
    <Datepicker
      className="text-[10em]"
      selected={startDate}
      onChange={onSingleChange}
      inline
      formatWeekDay={cuttingDayString}
      renderCustomHeader={CustomHeader}
      onMonthChange={handleMonthChange}
      dayClassName={date => otherMonthIndicator(date, currentMonth, currentYear)}
    />
  );
}
