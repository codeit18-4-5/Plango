"use client";
import cn from "@/lib/cn";
import { useRef } from "react";
import { useToggle, useClickOutside } from "@/hooks";
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
  const { isOpen, toggle, setClose } = useToggle();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(dropdownRef, setClose);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, size, selected, setSelected }}>
      <div ref={dropdownRef} className="relative inline-block">
        <div className={cn(dropDownStyle({ size, className }))}>{children}</div>
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.TriggerIcon = TriggerIcon;
Dropdown.TriggerSelect = TriggerSelect;
Dropdown.Menu = Menu;
Dropdown.Option = Option;
