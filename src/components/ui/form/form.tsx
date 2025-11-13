"use client";
import cn from "@/lib/cn";
import { ReactNode } from "react";
import { useForm, FormProvider, FieldValues, SubmitHandler, UseFormProps } from "react-hook-form";

type FormProps<T extends FieldValues = FieldValues> = {
  onSubmit?: SubmitHandler<T>;
  className?: string;
  children?: ReactNode;
} & UseFormProps<T>;

export default function Form<T extends FieldValues = FieldValues>({
  onSubmit,
  className,
  children,
  ...formOptions
}: FormProps<T>) {
  const methods = useForm<T>(formOptions);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : undefined}
        className={cn("flex flex-col gap-6", className)}
      >
        {children}
      </form>
    </FormProvider>
  );
}
