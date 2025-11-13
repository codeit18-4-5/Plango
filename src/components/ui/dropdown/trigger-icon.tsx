import cn from "@/lib/cn";
import { useContext } from "react";
import { DropdownContext } from "./dropdown.context";
import { DropdownProps } from "./dropdown.props";
import { dropDownTriggerStyle } from "./dropdown.styles";

export function TriggerIcon({ children, intent, className }: DropdownProps) {
  const ctx = useContext(DropdownContext);
  return (
    ctx && (
      <button onClick={ctx.toggle} className={cn(dropDownTriggerStyle({ intent, className }))}>
        {children}
      </button>
    )
  );
}
