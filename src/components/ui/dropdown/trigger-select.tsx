import cn from "@/lib/cn";
import { useContext } from "react";
import { DropdownContext } from "./dropdown.context";
import { SelectTriggerProps } from "./dropdown.props";
import { dropDownTriggerStyle } from "./dropdown.styles";

export function TriggerSelect({
  children,
  className,
  intent,
  isIcon,
  selectedLabel,
}: SelectTriggerProps) {
  const ctx = useContext(DropdownContext);
  return (
    ctx && (
      <button
        onClick={ctx.toggle}
        className={cn(
          dropDownTriggerStyle({ size: ctx?.size, intent, className }),
          ctx?.isOpen && "bg-gray-700",
        )}
        type="button"
      >
        {selectedLabel}
        {isIcon && children}
      </button>
    )
  );
}
