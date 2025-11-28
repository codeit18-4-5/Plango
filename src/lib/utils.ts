import { NO_AUTH_GET, NO_AUTH_URLS } from "@/constants/url";
import { AxiosRequestConfig } from "axios";

import { DateFullProps, DateTimeProps, FrequencyOptions } from "@/types/date-format-type";

/**
 * URL이 유효한 형식의 이미지 주소인지 검사
 * @author yeonsu
 * @param src 이미지 URL 문자열
 */
export const isValidImageSrc = (src?: string | null): src is string => {
  if (typeof src !== "string") {
    return false;
  }

  if (!src.trim()) {
    return false;
  }
  return (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("/") ||
    src.startsWith("data:image/")
  );
};

/**
 * 글 작성 후 경과 시간을 상대 시간(방금 전 등)으로 표시
 * 7일 이후는 YYYY.MM.DD 형식으로 표시
 * @author yeonsu
 * @param dateString 글 작성 시간
 */
export const getTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 1000 / 60);
  const diffHours = Math.floor(diffMs / 1000 / 60 / 60);
  const diffDays = Math.floor(diffMs / 1000 / 60 / 60 / 24);

  if (diffDays >= 7) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  }

  if (diffDays > 0) {
    return `${diffDays}일 전`;
  }

  if (diffHours > 0) {
    return `${diffHours}시간 전`;
  }

  if (diffMinutes > 0) {
    return `${diffMinutes}분 전`;
  }

  return "방금 전";
};

/**
 * datepicker week 3글자까지만 자르기 (e.g. Sunday -> Sun)
 * @author luli
 * @param day
 */
export const cuttingDayString = (day: string) => day.substring(0, 3);

/**
 * datepicker 현재 달력에서 보고있는 날짜를 제외한 날짜는 other-month-day class 적용
 * @author luli
 * @param date, currentMonth, currentYear
 */
export const otherMonthIndicator = (date: Date, currentMonth: number, currentYear: number) => {
  if (date.getMonth() !== currentMonth || date.getFullYear() !== currentYear) {
    return "other-month-day";
  }
  return "";
};

/**
 * date를 `MM월 DD일 (day)` 형식으로 포맷
 * @author luli
 * @param date
 */
export const formatDateForToMonthAndDays = (date: Date | string | undefined): string => {
  if (isEmpty(date)) return "";

  const resultDate = strToDate(date as Date | string);
  return resultDate
    .toLocaleDateString("ko-KR", {
      month: "long",
      day: "numeric",
      weekday: "short",
    })
    .replace("요일", "");
};

/**
 * date를 문자열 형식으로 포맷. 년월일
 * @author luli
 * @param date
 */
export const formatDateToFullStr = ({ date, type = "korean" }: DateFullProps): string => {
  if (isEmpty(date)) return "";

  const resultDate = strToDate(date as Date | string);
  let resultDateStr = "";
  if (type === "korean") {
    // `YYYY년 MM월 DD일`
    resultDateStr = resultDate.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else if (type === "dot") {
    // `YYYY.MM.DD`
    resultDateStr = resultDate
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, ".");
  }
  return resultDateStr;
};

/**
 * Date를 문자열 형식으로 포맷. 시간
 * @author luli
 * @param date
 */
export const formatTimeToStr = ({ date, type = "colon" }: DateTimeProps): string => {
  if (isEmpty(date)) return "";

  const resultDate = strToDate(date as Date | string);
  let resultTimeStr = "";
  if (type === "colon") {
    // "HH:mm"
    resultTimeStr = resultDate.toLocaleTimeString("ko-KR", {
      hour: "numeric",
      minute: "2-digit",
    });
  } else if (type === "meridiem") {
    // 오전 or 오후 HH:mm
    resultTimeStr = resultDate.toLocaleTimeString("ko-KR", {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
    });
  }
  return resultTimeStr;
};

/**
 * 넘어온 값 string check후 Date반환
 * @author luli
 * @param str
 */
export const strToDate = (str: Date | string): Date => {
  if (str instanceof Date) return str;
  return new Date(str);
};

/**
 * 간단한 비어있는값 체크. 객체, 배열, string, Date체크 가능
 * @author luli
 * @param value
 */
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true;
  if (value instanceof Date) return isNaN(value.getTime());
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) {
    return (
      value.length === 0 ||
      value.every(item => {
        if (item === 0 || item === "0") return false;
        return isEmpty(item);
      })
    );
  }
  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }
  return false;
};

/**
 * tasklist 반복설정 해당 값에 맞는 한글로 변환
 * @author luli
 * @param value
 */
export const getFrequencyLabel = (frequency: string): string => {
  return FrequencyOptions.find(fo => fo.value === frequency)?.label ?? "";
};

/**
 * get 요청중 인증이 불필요한 패턴 필터
 * @author sohyun
 * @param pattern
 * @param url
 */
export const matchPattern = (pattern: string | RegExp, url: string) => {
  if (typeof pattern === "string") {
    return url.startsWith(pattern);
  }
  return pattern.test(url);
};

/**
 * server fetch 에서 사용할 인증이 불필요한 URL 필터
 * @author sohyun
 * @param config
 */

export const isNoAuthURL = (url: string, method = "get") => {
  const apiMethod = method.toLowerCase();

  // method 상관없이 인증 불필요한 URL
  if (NO_AUTH_URLS.some(publicUrl => url.startsWith(publicUrl))) {
    return true;
  }

  // get 요청 중 인증 불필요한 패턴
  if (apiMethod === "get") {
    return NO_AUTH_GET.some(pattern => matchPattern(pattern, url));
  }

  return false;
};

/**
 * axios config를 받아 인증이 불필요한 URL 필터
 * @author sohyun
 * @param config
 */
export const isNoAuthAxios = (config: AxiosRequestConfig) => {
  const url = config.url || "";
  const method = (config.method || "get").toLowerCase();
  return isNoAuthURL(url, method);
};

/**
 * 숫자를 제한값 이상이면 "9999+" 형태로 변환
 */
export function clampText(value: number, limit: number, suffix = "+") {
  return value > limit ? `${limit}${suffix}` : value;
}

/**
 * 좋아요 숫자 SNS 표기 형식 단위로 포맷팅
 */
export function formatSocialCount(value: number): string {
  if (value < 10000) return value.toLocaleString();
  if (value / 10000 < 10000) return (value / 10000).toFixed(1).replace(/\.0$/, "") + "만";
  return (value / 100000000).toFixed(1).replace(/\.0$/, "") + "억";
}

/**
 * 토큰 만료 여부 확인
 * @param token JWT 토큰 문자열
 * @return 토큰 만료 여부 (true: 만료, false: 유효)
 */
export function isTokenExpire(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join(""),
  );

  const parseToken = JSON.parse(jsonPayload);

  const currentDate = new Date();
  const tokenExpirationDate = new Date(parseToken.exp * 1000);

  return currentDate > tokenExpirationDate;
}
