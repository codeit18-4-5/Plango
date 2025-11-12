import { createContext } from "react";
import { DropdownOption } from "@/types/option";

interface DropdownContextType {
  isOpen: boolean;
  toggle: () => void;
  size?: "sm" | "md" | undefined;
  onSelect?: (option: DropdownOption) => void;
  options?: DropdownOption[];
}

export const DropdownContext = createContext<DropdownContextType | null>(null);
