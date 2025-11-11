"use client";

import cn from "@/lib/cn";
import { MouseEvent } from "react";
import { CARD_ACTIONS_STYLES } from "./index.styles";
import Dropdown from "@/components/ui/dropdown/dropdown";
import IcKebab from "@/assets/icons/ic-kebab.svg";

export type CardAction = {
  label: string;
  onClick: () => void;
};

type CardActionsProps = {
  actions: CardAction[];
  className?: string;
  onStopPropagation?: (e: MouseEvent) => void;
};

export default function CardActions({ actions, className, onStopPropagation }: CardActionsProps) {
  if (actions.length === 0) return null;

  return (
    <div onClick={onStopPropagation} className={cn(CARD_ACTIONS_STYLES.wrapper, className)}>
      <Dropdown size="sm" className="z-5 w-auto align-top">
        <Dropdown.TriggerIcon intent="icon" className="p-0">
          <span className={CARD_ACTIONS_STYLES.icon}>
            <IcKebab />
          </span>
        </Dropdown.TriggerIcon>
        <Dropdown.Menu className="w-[120px] overflow-hidden">
          {actions.map(action => (
            <Dropdown.Option align="center" className="p-0 hover:bg-gray-700">
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
