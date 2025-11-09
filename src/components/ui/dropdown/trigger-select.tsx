import cn from "@/lib/cn";
import { useContext } from "react";
import { DropdownContext } from "./dropdown.context";
import { SelectTriggerProps } from "./dropdown.props";
import { dropDownTriggerStyle } from "./dropdown.styles";

export function TriggerSelect({ children, className, isIcon, intent }: SelectTriggerProps) {
  const ctx = useContext(DropdownContext);
  return (
    ctx && (
      <button
        onClick={ctx.toggle}
        className={cn(
          dropDownTriggerStyle({ size: ctx?.size, intent, className }),
          ctx?.isOpen && "bg-gray-700",
        )}
      >
        {ctx.selected ? ctx.selected : children}
        {isIcon && children}
      </button>
    )
  );
}
