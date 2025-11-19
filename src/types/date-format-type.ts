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
