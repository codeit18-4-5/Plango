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
