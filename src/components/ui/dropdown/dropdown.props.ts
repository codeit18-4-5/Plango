import { ReactNode } from "react";
import { DropdownOption } from "@/types/option";

export interface DropdownProps {
  size?: "sm" | "md" | undefined;
  intent?: "select" | "icon" | undefined;
  children?: ReactNode;
  className?: string;
  onSelect?: ({ label, value }: DropdownOption) => void;
}

export interface SelectTriggerProps extends DropdownProps {
  isIcon?: boolean;
  selectedLabel?: string;
}

export interface DropdownOptionProps extends DropdownProps {
  value?: string | undefined;
  label?: string | undefined;
  onClick?: () => void;
  align?: "center" | "left" | undefined;
}
