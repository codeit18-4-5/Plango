"use client";
import cn from "@/lib/cn";
import useToggle from "@/hooks/use-toggle";
import { DropdownContext } from "./dropdown.context";
import { DropdownProps } from "./dropdown.props";
import { dropDownStyle } from "./dropdown.styles";
import { TriggerIcon } from "./trigger-icon";
import { TriggerSelect } from "./trigger-select";
import { Menu } from "./menu";
import { Option } from "./option";

export default function Dropdown({
  size,
  children,
  className,
  selected,
  setSelected,
}: DropdownProps) {
  const { isOpen, toggle } = useToggle();

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, size, selected, setSelected }}>
      <div className={cn(dropDownStyle({ size, className }))}>{children}</div>
    </DropdownContext.Provider>
  );
}

Dropdown.TriggerIcon = TriggerIcon;
Dropdown.TriggerSelect = TriggerSelect;
Dropdown.Menu = Menu;
Dropdown.Option = Option;
