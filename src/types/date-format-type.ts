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

export const FrequencyType = {
  ONCE: "한번",
  DAILY: "매일 반복",
  WEEKLY: "매주 반복",
  MONTHLY: "매월 반복",
} as const;

export type FrequencyTypeValue = (typeof FrequencyType)[keyof typeof FrequencyType];
