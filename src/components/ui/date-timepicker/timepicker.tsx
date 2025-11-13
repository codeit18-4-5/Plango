"use client";

import React, { useEffect, useState } from "react";
import Button from "../button/button";

const TIME_PERIOD = {
  AM: "오전",
  PM: "오후",
} as const;

type TimePeriod = (typeof TIME_PERIOD)[keyof typeof TIME_PERIOD];

interface CustomTimePickerProps {
  selectedTime: Date | null;
  onTimeChange: (time: Date | null) => void;
}

export default function CustomTimePicker({ selectedTime, onTimeChange }: CustomTimePickerProps) {
  const [period, setPeriod] = useState<TimePeriod>(TIME_PERIOD.AM);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const times = Array.from({ length: 12 * 2 }, (_, i) => {
    const hour = (i >> 1) + 1;
    const minute = i % 2 === 0 ? 0 : 30;
    return { hour, minute, label: `${hour}:${minute.toString().padStart(2, "0")}` };
  });

  useEffect(() => {
    if (selectedTime) {
      const hour = selectedTime.getHours();
      const minute = selectedTime.getMinutes();
      const isPM = hour >= 12;
      setPeriod(isPM ? TIME_PERIOD.PM : TIME_PERIOD.AM);

      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const idx = times.findIndex(
        t => t.hour === displayHour && t.minute === (minute >= 30 ? 30 : 0),
      );
      setSelectedIndex(idx);
    }
  }, [selectedTime]);

  const handleTimeClick = (index: number) => {
    setSelectedIndex(index);
    const time = times[index];
    let hour = time.hour % 12;
    if (period === TIME_PERIOD.PM) hour += 12;
    if (period === TIME_PERIOD.AM && hour === 12) hour = 0;

    const newTime = new Date();
    newTime.setHours(hour, time.minute, 0, 0);
    onTimeChange(newTime);
  };

  const handlePeriodChange = (newPeriod: TimePeriod) => {
    setPeriod(newPeriod);
    if (selectedIndex !== null) handleTimeClick(selectedIndex);
  };

  return (
    <div className="flex h-[220px] items-start gap-[14px]">
      <div className="flex flex-col justify-center gap-[8px]">
        {Object.values(TIME_PERIOD).map(p => (
          <Button
            key={p}
            className={`h-[40px] w-[78px] bg-[#18212f] ${
              period === p ? "bg-pink-500 text-white" : ""
            }`}
            intent="primary"
            onClick={() => handlePeriodChange(p)}
          >
            {p}
          </Button>
        ))}
      </div>

      <div className="h-[152px] w-[220px] rounded-xl bg-[#18212f] px-[8px] py-[8px]">
        <div className="scroll-bar flex h-full w-full flex-col overflow-y-scroll rounded-xl bg-[#18212f] px-[14px] py-[8px]">
          {times.map((time, index) => (
            <button
              key={index}
              onClick={() => handleTimeClick(index)}
              className={`text-fs-body-m rounded px-[2px] py-[7.5px] text-left transition ${
                index === selectedIndex
                  ? "font-semibold text-pink-500 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              {time.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
