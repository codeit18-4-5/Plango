import { isAxiosError } from "axios";
import { UseFormSetError, FieldValues, Path } from "react-hook-form";
import type { ServerErrorHandler, ServerErrorMsg } from "@/types/api";
import { SignInSchema } from "./schema";

export function axiosErrorMsg<T extends FieldValues>(error: unknown, setError: UseFormSetError<T>) {
  if (!isAxiosError<ServerErrorMsg>(error)) {
    console.error(error);
    throw error;
  }

  const resData = error.response?.data;

  if (resData?.details) {
    Object.entries(resData.details).forEach(([field, info]) => {
      setError(field as Path<T>, { message: info.message });
    });
  } else {
    throw error;
  }
}

export const loginErrorHandler: ServerErrorHandler<SignInSchema> = (error, setError) => {
  if (!isAxiosError(error)) return;
  setError("email", { message: "이메일 혹은 비밀번호를 확인해주세요." });
  setError("password", { message: "이메일 혹은 비밀번호를 확인해주세요." });
};
