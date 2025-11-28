"use client";

import Datepicker from "react-datepicker";
import { useDatepickerDate } from "@/hooks";
import CustomHeader from "./custom-datepicker-header";
import { cuttingDayString, otherMonthIndicator } from "@/lib/utils";

interface CustomMultipleDatepickerProps {
  startDate: Date | null;
  endDate?: Date | null;
  onRangeChange?: (dates: [Date | null, Date | null]) => void;
}

export default function CustomMultipleDatepicker({
  startDate,
  endDate,
  onRangeChange,
}: CustomMultipleDatepickerProps) {
  const { currentMonth, currentYear, handleMonthChange } = useDatepickerDate();

  return (
    <Datepicker
      className="text-[10em]"
      selected={startDate}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      onChange={onRangeChange}
      selectsDisabledDaysInRange
      inline
      formatWeekDay={cuttingDayString}
      renderCustomHeader={CustomHeader}
      onMonthChange={handleMonthChange}
      dayClassName={date => otherMonthIndicator(date, currentMonth, currentYear)}
    />
  );
}
