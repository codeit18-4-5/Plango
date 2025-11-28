import { FieldValues, UseFormSetError } from "react-hook-form";

export interface ServerErrorMsg {
  message: string;
  details?: Record<string, { message: string }>;
}

export type ServerErrorHandler<T extends FieldValues = FieldValues> = (
  error: unknown,
  setError: UseFormSetError<T>,
) => void;

export type ImagesUpload = {
  url: File;
};
