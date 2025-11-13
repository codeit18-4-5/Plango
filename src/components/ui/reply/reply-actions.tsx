import cn from "@/lib/cn";
import { ReplyAction } from "@/types/action";
import { REPLY_ACTIONS_STYLES } from "./index.styles";
import { Dropdown } from "@/components/ui";
import IcKebab from "@/assets/icons/ic-kebab.svg";

type ReplyActionsProps = {
  actions: ReplyAction[];
  className?: string;
};

export default function ReplyActions({ actions, className }: ReplyActionsProps) {
  if (actions.length === 0) return null;

  return (
    <div className={cn(REPLY_ACTIONS_STYLES.wrapper, className)}>
      <Dropdown>
        <Dropdown.TriggerIcon intent="icon" className={REPLY_ACTIONS_STYLES.icon}>
          <IcKebab />
        </Dropdown.TriggerIcon>
        <Dropdown.Menu size="md">
          {actions.map(action => (
            <Dropdown.Option key={action.label} align="center" onClick={action.onClick}>
              {action.label}
            </Dropdown.Option>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
