import { useState } from "react";

export default function useDatepickerDate() {
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date.getMonth());
    setCurrentYear(date.getFullYear());
  };

  return { currentMonth, currentYear, handleMonthChange };
}
