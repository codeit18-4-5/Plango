import cn from "@/lib/cn";
import { useContext } from "react";
import { DropdownContext } from "./dropdown.context";
import { DropdownProps } from "./dropdown.props";
import { dropDownMenuStyle } from "./dropdown.styles";

export function Menu({ children, className }: DropdownProps) {
  const ctx = useContext(DropdownContext);

  return ctx?.isOpen && <ul className={cn(dropDownMenuStyle, className)}>{children}</ul>;
}
