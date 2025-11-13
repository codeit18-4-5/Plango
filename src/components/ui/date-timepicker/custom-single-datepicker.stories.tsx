import { useState } from "react";
import { SingleDatepicker, MultipleDatepicker, Timepicker } from "@/components/ui";
import "@/styles/custom-react-datepicker.css";

export default {
  title: "UI/DatePicker",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#0f172a",
        },
        {
          name: "light",
          value: "#ffffff",
        },
      ],
    },
    docs: {
      description: {
        component: "날짜 및 시간 선택 컴포넌트 모음",
      },
    },
  },
};

export const SingleDatePicker = {
  name: "Single Datepicker",
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());

    return (
      <div className="flex flex-col gap-4">
        <div className="text-white">
          <p className="mb-2 text-sm text-gray-400">선택된 날짜:</p>
          <p className="font-semibold text-pink-600">
            {date ? date.toLocaleDateString("ko-KR") : "날짜를 선택해주세요"}
          </p>
        </div>
        <SingleDatepicker startDate={date} onSingleChange={setDate} />
      </div>
    );
  },
};

export const MultipleDatePicker = {
  name: "Multiple Datepcker (Range)",
  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleRangeChange = (dates: [Date | null, Date | null]) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    };

    return (
      <div className="flex flex-col gap-4">
        <div className="text-white">
          <p className="mb-2 text-sm text-gray-400">선택된 기간:</p>
          <p className="font-semibold text-pink-600">
            {startDate ? startDate.toLocaleDateString("ko-KR") : "시작일"}
            {" ~ "}
            {endDate ? endDate.toLocaleDateString("ko-KR") : "종료일"}
          </p>
        </div>
        <MultipleDatepicker
          startDate={startDate}
          endDate={endDate}
          onRangeChange={handleRangeChange}
        />
      </div>
    );
  },
};

export const TimePicker = {
  name: "Timepicker",
  render: () => {
    const [time, setTime] = useState<Date | null>(new Date());

    return (
      <div className="flex flex-col gap-4">
        <div className="text-white">
          <p className="mb-2 text-sm text-gray-400">선택된 시간:</p>
          <p className="font-semibold text-pink-600">
            {time
              ? time.toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : "시간을 선택해주세요"}
          </p>
        </div>
        <Timepicker selectedTime={time} onTimeChange={setTime} />
      </div>
    );
  },
};
