"use client";

import cn from "@/lib/cn";
import Link from "next/link";
import { ReactNode, createContext, useContext, MouseEvent } from "react";
import CardBadge from "./card-badge";
import CardContent from "./card-content";
import CardInfo from "./card-info";
import CardActions from "./card-actions";
import { CardAction } from "@/types/action";
import { CARD_WRAPPER_STYLES } from "./index.styles";

type CardContextType = {
  hasActions: boolean;
};

type CardProps = {
  id: number;
  children: ReactNode;
  className?: string;
  href?: string;
  actions?: CardAction[];
};

const CardContext = createContext<CardContextType>({ hasActions: false });

export const useCardContext = () => useContext(CardContext);

function Card({ id, children, className, href, actions = [] }: CardProps) {
  const hasLink = typeof href === "string" && href.length > 0;
  const hasActions = actions.length > 0;

  const handleActionClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <CardContext.Provider value={{ hasActions }}>
      <div key={id} className={CARD_WRAPPER_STYLES.wrapper(hasLink, className)}>
        {hasLink ? (
          <Link
            href={href!}
            className={cn(
              CARD_WRAPPER_STYLES.inner,
              CARD_WRAPPER_STYLES.group,
              CARD_WRAPPER_STYLES.spacing(hasActions),
            )}
          >
            {children}
          </Link>
        ) : (
          <div className={cn(CARD_WRAPPER_STYLES.group, CARD_WRAPPER_STYLES.spacing(hasActions))}>
            {children}
          </div>
        )}
        {hasActions && <CardActions actions={actions} onStopPropagation={handleActionClick} />}
      </div>
    </CardContext.Provider>
  );
}

Card.Badge = CardBadge;
Card.Content = CardContent;
Card.Info = CardInfo;

export default Card;
