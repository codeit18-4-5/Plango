import { NextResponse } from "next/server";

/**
 * 서버에서 에러 발생시 메세지 출력
 * @author sohyun
 * @param devMessage 터미널에 출력될 메세지
 * @param userMessage 사용자에게 보여줄 메시지(필요하다면)
 * @param status HTTP status code
 */
export function createErrorResponse(devMessage: string, userMessage: string, status = 400) {
  if (process.env.NODE_ENV === "development") {
    console.error(devMessage);
    console.log(`userMessage: ${userMessage} status: ${status}`);
  }

  return NextResponse.json({ message: userMessage }, { status });
}
/**
 * server fetch 헬퍼함수 에러처리
 * @author sohyun
 */
export const serverFetchErrorHandler = class ServerFetchError extends Error {
  status: number;
  constructor(message = "로그인이 만료되었습니다.", status = 401) {
    super(message);
    this.name = "ServerFetchError";
    this.status = status;
  }
};
