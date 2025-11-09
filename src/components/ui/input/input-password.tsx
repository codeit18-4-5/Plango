"use client";
import cn from "@/lib/cn";
import { useContext } from "react";
import inputStyle from "./input.style";
import { InputContext } from "./input.context";
import Button from "../button/button";
import IcVisible from "@/assets/icons/ic-visible.svg";
import IcVisibleOff from "@/assets/icons/ic-visible-false.svg";
import useToggle from "@/hooks/use-toggle";

type InputPasswordProps = {
  name?: string;
  disabled?: boolean;
  className?: string;
};

export default function InputPassword({
  name,
  disabled = false,
  className,
  ...props
}: InputPasswordProps) {
  const ctx = useContext(InputContext);
  const { isOpen, toggle } = useToggle();

  return (
    <div className="relative">
      <input
        type={isOpen ? "text" : "password"}
        id={ctx?.id}
        name={name}
        disabled={disabled}
        className={cn(
          inputStyle({ intent: "password", disabled, error: Boolean(ctx?.errorMsg) }),
          className,
        )}
        {...props}
      />
      <Button
        size="icon"
        aria-label={isOpen ? "비밀번호 숨기기" : "비밀번호 보기"}
        onClick={toggle}
        className="absolute right-4 top-1/2 -translate-y-1/2"
      >
        {isOpen ? <IcVisible /> : <IcVisibleOff />}
      </Button>
    </div>
  );
}
