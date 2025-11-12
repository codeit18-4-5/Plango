import cn from "@/lib/cn";
import { useContext, ElementType, MouseEvent } from "react";
import { DropdownContext } from "./dropdown.context";
import { DropdownOptionProps } from "./dropdown.props";
import { dropDownOptionStyle } from "./dropdown.styles";

export function Option({
  as = "button",
  children,
  onClick,
  option,
  align,
  className,
  ...props
}: DropdownOptionProps<ElementType>) {
  const ctx = useContext(DropdownContext);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (option) {
      ctx?.onSelect?.(option);
    }
    onClick?.();
    ctx?.toggle();
  };
  const Component = as;

  return (
    ctx?.isOpen && (
      <li className="w-full first:rounded-t-[12px] last:rounded-b-[12px] hover:bg-gray-700">
        <Component
          onClick={handleClick}
          {...props}
          className={cn(dropDownOptionStyle({ size: ctx?.size, align, className }))}
        >
          {children}
        </Component>
      </li>
    )
  );
}
