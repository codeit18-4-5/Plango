import { isAxiosError } from "axios";
import { UseFormSetError, FieldValues, Path } from "react-hook-form";
import type { ServerErrorHandler, ServerErrorMsg } from "@/types/api";
import { ChangeProfileSchema, SendEmailSchema, SignInSchema } from "./schema";

/**
 * 회원 가입 시 서버에서 전달된 에러 내용을 RHF의 setError에 연결해주는 함수
 * @author sohyun
 */
export const signUpErrorHandler = <T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
) => {
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
};

/**
 * 로그인 실패시 서버 에러 처리
 * @author sohyun
 */
export const signInErrorHandler: ServerErrorHandler<SignInSchema> = (error, setError) => {
  if (!isAxiosError(error)) return;
  setError("email", { message: "이메일 혹은 비밀번호를 확인해주세요." });
  setError("password", { message: "이메일 혹은 비밀번호를 확인해주세요." });
};

/**
 * 닉네임 중복시 서버 에러 처리
 * @author sohyun
 */
export const nicknameErrorHandler: ServerErrorHandler<ChangeProfileSchema> = (error, setError) => {
  if (!isAxiosError(error)) return;
  setError("nickname", { message: "이미 사용중인 닉네임입니다." });
};

/**
 * 비밀번호 재설정 에러
 * @author sohyun
 */
export const sendEmailErrorHandler: ServerErrorHandler<SendEmailSchema> = (error, setError) => {
  if (!isAxiosError(error)) return;
  setError("sendEmail", { message: "가입되지 않은 회원정보 입니다." });
};
