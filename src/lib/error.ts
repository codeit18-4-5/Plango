import { isAxiosError } from "axios";
import { UseFormSetError, FieldValues, Path } from "react-hook-form";
import type { ServerErrorHandler, ServerErrorMsg } from "@/types/api";
import { SignInSchema } from "./schema";

/**
 * 서버에서 전달된 에러 내용을 react hook form의 setError에 연결해주는 함수
 * @author sohyun
 */
export function axiosErrorMsg<T extends FieldValues>(error: unknown, setError: UseFormSetError<T>) {
  if (!isAxiosError<ServerErrorMsg>(error)) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    throw error;
  }

  const resData = error.response?.data;
  // 서버 검증 에러
  if (resData?.details) {
    Object.entries(resData.details).forEach(([field, info]) => {
      // RHF 입력 필드에 구체적인 에러 표시
      setError(field as Path<T>, { message: info.message });
    });
  } else {
    // 예상치 못한 에러 처리
    throw error;
  }
}

/**
 * 로그인 실패시 서버 에러 처리
 * @author sohyun
 */
export const loginErrorHandler: ServerErrorHandler<SignInSchema> = (error, setError) => {
  if (!isAxiosError(error)) return;
  setError("email", { message: "이메일 혹은 비밀번호를 확인해주세요." });
  setError("password", { message: "이메일 혹은 비밀번호를 확인해주세요." });
};
