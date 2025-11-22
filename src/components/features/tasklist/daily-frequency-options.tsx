"use client";

import { Button } from "@/components/ui";
import cn from "@/lib/cn";
import { DailyFrequency } from "@/types/date-format-type";

interface dailyFrequencyProps {
  chooseIndexArray?: number[];
  onChange: (dayIndex: number) => void;
}

export default function DailyFrequencyOptions({
  chooseIndexArray = [],
  onChange,
}: dailyFrequencyProps) {
  const dailyList = DailyFrequency;

  return (
    <div className="flex w-full gap-[4.6px]">
      {dailyList.map(list => {
        const isSelected = chooseIndexArray.includes(list.value);

        return (
          <Button
            key={list.value}
            intent="tertiary"
            className={cn("w-full px-[13px]", isSelected ? "bg-pink-400 text-white" : "")}
            onClick={() => onChange(list.value)}
          >
            {list.label}
          </Button>
        );
      })}
    </div>
  );
}
