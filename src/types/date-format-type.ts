interface DateCommonProps {
  date: Date | string | undefined;
}

export interface DateFullProps extends DateCommonProps {
  type?: DateFormatTypeFullValue;
}

export interface DateTimeProps extends DateCommonProps {
  type?: DateFormatTypeTimeValue;
}

export const DateFormatTypeFull = {
  Dot: "dot",
  Korean: "korean",
} as const;

export type DateFormatTypeFullValue = (typeof DateFormatTypeFull)[keyof typeof DateFormatTypeFull];

export const DateFormatTypeTime = {
  Colon: "colon",
  Meridiem: "meridiem",
} as const;

export type DateFormatTypeTimeValue = (typeof DateFormatTypeTime)[keyof typeof DateFormatTypeTime];

export const FrequencyOptions = [
  { label: "한 번", value: "ONCE" },
  { label: "매일 반복", value: "DAILY" },
  { label: "매주 반복", value: "WEEKLY" },
  { label: "매월 반복", value: "MONTHLY" },
] as const;

export type FrequencyTypeArray = (typeof FrequencyOptions)[number];

export const DailyFrequency = [
  { label: "일", value: 0 },
  { label: "월", value: 1 },
  { label: "화", value: 2 },
  { label: "수", value: 3 },
  { label: "목", value: 4 },
  { label: "금", value: 5 },
  { label: "토", value: 6 },
];

export type DailyFrequencyArray = (typeof DailyFrequency)[number];

export const FrequencyType = {
  Once: "ONCE",
  Daily: "DAILY",
  Weekly: "WEEKLY",
  Monthly: "MONTHLY",
} as const;

export type FrequencyTypeValue = (typeof FrequencyType)[keyof typeof FrequencyType];
