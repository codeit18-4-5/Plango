"use client";

import cn from "@/lib/cn";
import { CARD_ACTIONS_STYLES } from "./index.styles";
import Dropdown from "@/components/ui/dropdown/dropdown";
import IcKebab from "@/assets/icons/ic-kebab.svg";

type CardActionsProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
};

export default function CardActions({ onEdit, onDelete, className }: CardActionsProps) {
  return (
    <Dropdown size="sm" className={cn(CARD_ACTIONS_STYLES.wrapper, className)}>
      <Dropdown.TriggerIcon intent="icon">
        <span className={CARD_ACTIONS_STYLES.icon}>
          <IcKebab />
        </span>
      </Dropdown.TriggerIcon>
      <Dropdown.Menu>
        <Dropdown.Option align="center" onClick={onEdit}>
          수정하기
        </Dropdown.Option>
        <Dropdown.Option align="center" onClick={onDelete}>
          삭제하기
        </Dropdown.Option>
      </Dropdown.Menu>
    </Dropdown>
  );
}
