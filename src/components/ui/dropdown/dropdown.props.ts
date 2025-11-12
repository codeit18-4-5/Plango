import { ReactNode } from "react";
import { DropdownOption } from "@/types/option";

export interface DropdownProps {
  size?: "sm" | "md" | undefined;
  intent?: "select" | "icon" | undefined;
  children?: ReactNode;
  className?: string;
  options?: DropdownOption[];
  onSelect?: ({ label, value }: DropdownOption) => void;
}

export interface SelectTriggerProps extends DropdownProps {
  isIcon?: boolean;
  selectedLabel?: string;
}

export interface DropdownOptionProps extends DropdownProps {
  option?: DropdownOption;
  onClick?: () => void;
  align?: "center" | "left" | undefined;
}
