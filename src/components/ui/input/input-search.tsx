"use client";
import cn from "@/lib/cn";
import { useContext } from "react";
import inputStyle from "./input.style";
import { InputContext } from "./input.context";
import IcSearch from "@/assets/icons/ic-search.svg";

type InputSearchProps = {
  disabled?: boolean;
  className?: string;
};

export default function InputSearch({ disabled = false, className, ...props }: InputSearchProps) {
  const ctx = useContext(InputContext);

  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2">
        <IcSearch />
      </div>
      <input
        type="search"
        id={ctx?.id}
        disabled={disabled}
        className={cn(
          inputStyle({ intent: "search", disabled, error: Boolean(ctx?.errorMsg) }),
          className,
        )}
        {...props}
      />
    </div>
  );
}
