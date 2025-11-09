import { ReactNode } from "react";

export interface DropdownProps {
  size?: "sm" | "md" | undefined;
  intent?: "select" | "icon" | undefined;
  children?: ReactNode;
  className?: string;
  selected?: string;
  setSelected?: (value: string) => void;
}

export interface SelectTriggerProps extends DropdownProps {
  isIcon?: boolean;
}

export interface DropdownOptionProps extends DropdownProps {
  value?: string | undefined;
  label?: string | undefined;
  onClick?: () => void;
  align?: "center" | "left" | undefined;
}
