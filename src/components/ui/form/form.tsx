"use client";
import cn from "@/lib/cn";
import { ServerErrorHandler } from "@/types/api";
import { ReactNode } from "react";
import {
  useForm,
  FormProvider,
  FieldValues,
  SubmitHandler,
  UseFormProps,
  SubmitErrorHandler,
} from "react-hook-form";

type FormProps<T extends FieldValues = FieldValues> = {
  onSubmit?: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
  onServerError?: ServerErrorHandler<T>;
  className?: string;
  children?: ReactNode;
} & UseFormProps<T>;

export default function Form<T extends FieldValues = FieldValues>({
  onSubmit,
  onError,
  onServerError,
  className,
  children,
  ...formOptions
}: FormProps<T>) {
  const methods = useForm<T>(formOptions);
  const { handleSubmit, setError } = methods;

  const handleFormSubmit: SubmitHandler<T> = async data => {
    try {
      const result = await onSubmit?.(data);
      return result;
    } catch (error) {
      if (onServerError) {
        onServerError(error, setError);
      } else {
        if (process.env.NODE_ENV === "development") {
          console.error(error);
        }
        throw error;
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleFormSubmit, onError)}
        className={cn("flex flex-col gap-6", className)}
      >
        {children}
      </form>
    </FormProvider>
  );
}
