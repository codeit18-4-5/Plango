"use client";
import cn from "@/lib/cn";
import { ElementType, ComponentPropsWithoutRef, useContext, forwardRef } from "react";
import inputStyle from "./input.style";
import { InputContext } from "./input.context";

type InputFieldProps<T extends ElementType = "input"> = {
  as?: T;
  type?: string;
  inputSize?: "sm" | "md";
  disabled?: boolean;
  className?: string;
} & ComponentPropsWithoutRef<T>;

const InputField = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputFieldProps<ElementType>>(
  function InputField({ as, type, inputSize = "sm", disabled = false, className, ...props }, ref) {
    const ctx = useContext(InputContext);
    const Component = as || "input";
    const isTextarea = as === "textarea";
    const intent = isTextarea ? "textarea" : "text";

    return (
      <>
        <Component
          ref={ref}
          id={ctx?.id}
          disabled={disabled}
          className={cn(
            inputStyle({ inputSize, intent, disabled, error: Boolean(ctx?.errorMsg) }),
            className,
          )}
          {...(!isTextarea && type ? { type } : {})}
          {...props}
        />
      </>
    );
  },
);

export default InputField;
