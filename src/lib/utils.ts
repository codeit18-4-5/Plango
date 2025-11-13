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
 * datepicker 넘어간 date를 `YYYY년 MM월 DD일` 형식으로 포맷 -> input용
 * @author luli
 * @param date
 */
export const formatDateToKorean = (date: Date): string => {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * 시간을 "HH:mm" 형식으로 포맷
 * @author luli
 * @param date
 */
export const formatTimeToKorean = (date: Date): string => {
  return date.toLocaleTimeString("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
  });
};
