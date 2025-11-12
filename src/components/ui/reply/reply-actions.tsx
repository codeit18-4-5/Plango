import cn from "@/lib/cn";
import Dropdown from "@/components/ui/dropdown/dropdown";
import IcKebab from "@/assets/icons/ic-kebab.svg";

export type ReplyAction = {
  label: string;
  onClick: () => void;
};

type ReplyActionsProps = {
  actions: ReplyAction[];
  className?: string;
};

export default function ReplyActions({ actions, className }: ReplyActionsProps) {
  return (
    <div className={cn("absolute right-0 top-0 flex items-center justify-end", className)}>
      <Dropdown size="sm" className="z-5 w-auto align-top">
        <Dropdown.TriggerIcon intent="icon" className="p-0">
          <span className="flex size-6 items-center justify-center text-gray-400 hover:text-gray-300">
            <IcKebab />
          </span>
        </Dropdown.TriggerIcon>
        <Dropdown.Menu className="w-[120px] overflow-hidden">
          {actions.map((action, index) => (
            <Dropdown.Option key={index} align="center" className="p-0 hover:bg-gray-700">
              <button
                type="button"
                onClick={action.onClick}
                className="block w-full p-[11px_8px] text-body-s font-light text-gray-100"
              >
                {action.label}
              </button>
            </Dropdown.Option>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
