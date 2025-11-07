/**
 * URL이 유효한 형식의 이미지 주소인지 검사
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
