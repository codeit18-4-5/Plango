import { Dropdown } from "@/components/ui";
import IcKebab from "@/assets/icons/ic-kebab.svg";

type OptionType = {
  label: string;
  onClick?: () => void;
  as?: React.ElementType;
  href?: string;
  disabled?: boolean;
} & Record<string, unknown>;

type ArticleKebabMenuProps = {
  options: OptionType[];
  className?: string;
};

export default function KebabMenu({ options, className }: ArticleKebabMenuProps) {
  return (
    <Dropdown className={className}>
      <Dropdown.TriggerIcon
        intent="icon"
        className="duration-200 hover:text-gray-400 focus:text-gray-200 active:text-gray-300"
        aria-label="옵션 더보기"
      >
        <IcKebab />
      </Dropdown.TriggerIcon>
      <Dropdown.Menu size="md">
        {options.map((opt, idx) => (
          <Dropdown.Option
            key={opt.label + idx}
            align="center"
            as={opt.as}
            href={opt.href}
            onClick={opt.onClick}
            disabled={opt.disabled}
            {...opt}
          >
            {opt.label}
          </Dropdown.Option>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
