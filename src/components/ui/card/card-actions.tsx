"use client";

import cn from "@/lib/cn";
import { MouseEvent } from "react";
import { CardAction } from "@/types/action";
import { CARD_ACTIONS_STYLES } from "./index.styles";
import { Dropdown } from "@/components/ui";
import IcKebab from "@/assets/icons/ic-kebab.svg";

type CardActionsProps = {
  actions: CardAction[];
  className?: string;
  onStopPropagation?: (e: MouseEvent) => void;
};

export default function CardActions({ actions, className, onStopPropagation }: CardActionsProps) {
  if (actions.length === 0) return null;

  return (
    <div onClick={onStopPropagation} className={cn(CARD_ACTIONS_STYLES.wrapper, className)}>
      <Dropdown>
        <Dropdown.TriggerIcon intent="icon" className={CARD_ACTIONS_STYLES.icon}>
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
