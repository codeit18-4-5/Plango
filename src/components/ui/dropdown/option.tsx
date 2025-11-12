import cn from "@/lib/cn";
import { useContext } from "react";
import { DropdownContext } from "./dropdown.context";
import { DropdownOptionProps } from "./dropdown.props";
import { dropDownOptionStyle } from "./dropdown.styles";

export function Option({ children, onClick, option, align, className }: DropdownOptionProps) {
  const ctx = useContext(DropdownContext);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (option) {
      ctx?.onSelect?.(option);
    }
    onClick?.();
    ctx?.toggle();

    return null;
  };

  return (
    ctx?.isOpen && (
      <li
        onClick={handleClick}
        className={cn(dropDownOptionStyle({ size: ctx?.size, align, className }))}
      >
        {children}
      </li>
    )
  );
}
