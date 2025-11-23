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
export class ServerFetchError extends Error {
  status: number;
  response?: Response;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ServerFetchError";
    this.status = status;
  }
}
