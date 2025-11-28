import { Button, Dropdown, Form, Input, Modal, Timepicker } from "@/components/ui";
import { formatDateToFullStr, formatTimeToStr, isEmpty } from "@/lib/utils";
import { DropdownOption } from "@/types/option";
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import IcDropdown from "@/assets/icons/ic-dropdown.svg";
import { FrequencyOptions, FrequencyType } from "@/types/date-format-type";
import CustomSingleDatepicker from "@/components/ui/date-timepicker/single-datepicker";
import DailyFrequencyOptions from "./daily-frequency-options";
import z4 from "zod/v4";
import { taskDetailSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface TaskRecurringProps {
  isOpen: boolean;
  onClose: () => void;
  isPending: boolean;
  onSubmit: (value: z4.infer<typeof taskDetailSchema>) => Promise<void>;
}

export default function TaskRecurringAddModal({
  isOpen,
  onClose,
  isPending,
  onSubmit,
}: TaskRecurringProps) {
  const [dayIndexArray, setDayIndexArray] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit: SubmitHandler<z4.infer<typeof taskDetailSchema>> = async submitData => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const { weekDays, ...rest } = submitData;

      const transformedData = {
        ...rest,
        description: rest.description || "",
        ...(rest.frequencyType === FrequencyType.Monthly && {
          monthDay: new Date(rest.startDate).getDate(),
        }),
        ...(rest.frequencyType === FrequencyType.Weekly && { weekDays: weekDays }),
      };
      await onSubmit(transformedData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultValues = {
    name: "",
    description: "",
    frequencyType: FrequencyType.Once,
    startDate: "",
    weekDays: [],
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Form
        onSubmit={handleSubmit}
        resolver={zodResolver(taskDetailSchema)}
        mode="onSubmit"
        defaultValues={defaultValues}
      >
        <Modal.HeaderWithClose title="할 일 만들기" />
        <FormField dayIndexArray={dayIndexArray} setDayIndexArray={setDayIndexArray} />
        <Modal.FooterWithOnlyConfirm
          confirmButtonTitle="만들기"
          isSubmit
          disabled={isPending || isSubmitting}
        />
      </Form>
    </Modal>
  );
}

function FormField({
  dayIndexArray,
  setDayIndexArray,
}: {
  dayIndexArray: number[];
  setDayIndexArray: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const {
    setValue,
    control,
    formState: { errors },
    clearErrors,
    watch,
  } = useFormContext<z4.infer<typeof taskDetailSchema>>();

  const [isDatepickerOpen, setIsDatepickerOpen] = useState(false);
  const [isTimepickerOpen, setIsTimepickerOpen] = useState(false);
  const [isWeekpickerOpen, setIsWeekpickerOpen] = useState(false);

  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const currentDay = formatDateToFullStr({ date: new Date(), type: "korean" });
  const currentTime = formatTimeToStr({ date: new Date(), type: "meridiem" });

  const selectOptions: readonly DropdownOption[] = FrequencyOptions;

  const handleSelectValue = (option: DropdownOption) => {
    if (!option.value) return;

    setValue("frequencyType", option.value, { shouldValidate: true });

    if (option.value === FrequencyType.Weekly) {
      setIsWeekpickerOpen(true);
    } else {
      setIsWeekpickerOpen(false);
      setDayIndexArray([]);
    }
  };

  const dateWrapperRef = useRef<HTMLDivElement>(null);
  const timeWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dateWrapperRef.current && !dateWrapperRef.current.contains(event.target as Node)) {
        setIsDatepickerOpen(false);
      } else if (timeWrapperRef.current && !timeWrapperRef.current.contains(event.target as Node)) {
        setIsTimepickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDateChange = (date: Date | null) => {
    if (isEmpty(date)) return;
    setStartDate(date);
    setIsDatepickerOpen(false);
    setDateValue(date ? formatDateToFullStr({ date: date, type: "korean" }) : "");
  };

  const handleTimeChange = (time: Date | null) => {
    if (isEmpty(time)) return;
    setStartTime(time);
    setIsTimepickerOpen(false);
    setTimeValue(time ? formatTimeToStr({ date: time, type: "meridiem" }) : "");
  };

  useEffect(() => {
    if (startDate && startTime) {
      mergeDate();
    }
  }, [startDate, startTime]);

  const mergeDate = () => {
    if (!(startDate && startTime)) return;
    const year = startDate.getFullYear();
    const month = startDate.getMonth();
    const day = startDate.getDate();

    const hour = startTime.getHours();
    const minute = startTime.getMinutes();
    const second = startTime.getSeconds();
    const ms = startTime.getMilliseconds();

    const resultMergeDate = new Date(year, month, day, hour, minute, second, ms);
    setValue("startDate", resultMergeDate.toISOString(), { shouldValidate: true });
    clearErrors("startDate");
  };

  const handleTodayPickerClick = () => {
    handleDateChange(new Date());
  };

  const handleDayClick = (dayIndex: number) => {
    setDayIndexArray(prev => {
      const newArray = prev.includes(dayIndex)
        ? prev.filter(item => item !== dayIndex)
        : [...prev, dayIndex];
      setValue("weekDays", newArray, { shouldValidate: true });
      if (newArray.length > 0) {
        clearErrors("frequencyType");
      }
      return newArray;
    });
  };

  const frequencyTypeValue = watch("frequencyType");

  return (
    <Modal.Body>
      <div className="mb-[24px] w-full text-center">
        <span className="text-body-s text-gray-500">
          할 일은 실제로 행동 가능한 작업 중심으로
          <br />
          작성해주시면 좋습니다.
        </span>
      </div>
      <div className="flex flex-col gap-[24px]">
        <Input errorMsg={errors.name && errors.name.message}>
          <Input.Label label="할 일 제목" />
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <>
                <Input.Field
                  {...field}
                  placeholder="할 일 제목을 입력해주세요."
                  maxLength="30"
                  value={field.value || ""}
                />
                <Input.Error />
              </>
            )}
          />
        </Input>
        <Input errorMsg={errors.startDate && errors.startDate.message}>
          <Input.Label label="시작 날짜 및 시간" />
          <Input.Error />
          <div className="grid grid-cols-[3fr_2fr] gap-[8px]">
            <Input.Field
              value={dateValue || undefined}
              placeholder={currentDay}
              onFocus={() => setIsDatepickerOpen(true)}
              readOnly
            />
            <Input.Field
              value={timeValue || undefined}
              placeholder={currentTime}
              onFocus={() => setIsTimepickerOpen(true)}
              readOnly
            />
          </div>
        </Input>
        {isDatepickerOpen && (
          <>
            <Input>
              <div
                className="h-[305px] overflow-hidden rounded-xl border border-pink-500"
                ref={dateWrapperRef}
              >
                <CustomSingleDatepicker
                  onSingleChange={date => handleDateChange(date)}
                  startDate={startDate}
                  useMinDate
                />
              </div>
            </Input>
            <Button className="-mt-[15px] h-[30px]" onMouseDown={handleTodayPickerClick}>
              오늘 날짜 선택
            </Button>
          </>
        )}
        {isTimepickerOpen && (
          <Input>
            <div
              className="h-[180px] rounded-xl border border-pink-500 p-[12px]"
              ref={timeWrapperRef}
            >
              <Timepicker onTimeChange={time => handleTimeChange(time)} selectedTime={startTime} />
            </div>
          </Input>
        )}
        <Input errorMsg={errors.frequencyType && errors.frequencyType.message}>
          <Input.Label label="반복 설정" />
          <Input.Error />
          <div>
            <Controller
              name="frequencyType"
              control={control}
              render={({ field }) => (
                <Dropdown size="md" onSelect={handleSelectValue}>
                  <Dropdown.TriggerSelect
                    className="bg-[#18212F]"
                    isIcon={true}
                    intent="select"
                    {...field}
                    selectedLabel={
                      frequencyTypeValue
                        ? selectOptions.find(option => option.value === frequencyTypeValue)?.label
                        : ""
                    }
                  >
                    <span className="w-[24px]">
                      <IcDropdown />
                    </span>
                  </Dropdown.TriggerSelect>
                  <Dropdown.Menu>
                    {selectOptions.map(option => (
                      <Dropdown.Option key={option.value} option={option}>
                        {option.label}
                      </Dropdown.Option>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            />
          </div>
        </Input>
        {isWeekpickerOpen && (
          <Input>
            <Input.Label label="반복 요일" />
            <DailyFrequencyOptions onChange={handleDayClick} chooseIndexArray={dayIndexArray} />
          </Input>
        )}
        <Input errorMsg={errors.description && errors.description.message}>
          <Input.Label label="할 일 메모" />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <>
                <Input.Field
                  as="textarea"
                  {...field}
                  placeholder="메모를 입력해주세요."
                  maxLength="255"
                  value={field.value || ""}
                />
                <Input.Error />
              </>
            )}
          />
        </Input>
      </div>
    </Modal.Body>
  );
}
