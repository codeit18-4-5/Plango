import cn from "@/lib/cn";
import { ChangeEvent } from "react";
import IcCheckbox from "@/assets/icons/ic-checked.svg";
import IcChecked from "@/assets/icons/ic-checked-color.svg";

type CheckboxProps = {
  checked: boolean; // check 여부
  onChange?: (checked: boolean) => void; // 상태 변경
  readOnly?: boolean; // 읽기 전용
  disabled?: boolean;
  className?: string;
  label?: string;
};

export default function Checkbox({
  checked,
  onChange,
  readOnly = false,
  disabled = false,
  className,
  label,
  ...props
}: CheckboxProps) {
  const handleCheckboxToggle = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return;
    onChange?.(e.target.checked);
  };

  return (
    <div className="relative">
      <label className={cn("flex cursor-pointer items-center gap-2", className)}>
        {checked ? <IcChecked className="h-6 w-6" /> : <IcCheckbox className="h-6 w-6" />}
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxToggle}
          readOnly={readOnly}
          disabled={disabled}
          {...props}
        />
        {label && (
          <span className={cn("text-body-s text-gray-100", checked && "line-through")}>
            {label}
          </span>
        )}
      </label>
    </div>
  );
}
