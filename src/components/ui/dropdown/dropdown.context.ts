import { createContext } from "react";

interface DropdownContextType {
  isOpen: boolean;
  toggle: () => void;
  size?: "sm" | "md" | undefined;
  selected?: string | undefined;
  setSelected?: (value: string) => void;
}

export const DropdownContext = createContext<DropdownContextType | null>(null);
