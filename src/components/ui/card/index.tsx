"use client";

import { ReactNode, Children, isValidElement, createContext, useContext } from "react";
import CardBadge from "./card-badge";
import CardContent from "./card-content";
import CardInfo from "./card-info";
import CardActions from "./card-actions";
import CardLink from "./card-link";
import { CARD_WRAPPER_STYLES } from "./index.styles";

type CardContextType = {
  hasActions: boolean;
};

const CardContext = createContext<CardContextType>({ hasActions: false });

export const useCardContext = () => useContext(CardContext);

type CardProps = {
  id: number;
  children: ReactNode;
  className?: string;
};

function Card({ id, children, className }: CardProps) {
  const hasLink = Children.toArray(children).some(
    child =>
      isValidElement(child) &&
      (child.type === CardLink ||
        (child.type as { displayName?: string })?.displayName === "CardLink"),
  );

  const hasActions = Children.toArray(children).some(
    child =>
      isValidElement(child) &&
      (child.type === CardActions ||
        (child.type as { displayName?: string })?.displayName === "CardActions"),
  );

  return (
    <CardContext.Provider value={{ hasActions }}>
      <div key={id} className={CARD_WRAPPER_STYLES.wrapper(hasLink, className)}>
        {children}
      </div>
    </CardContext.Provider>
  );
}

Card.Badge = CardBadge;
Card.Content = CardContent;
Card.Info = CardInfo;
Card.Actions = CardActions;
Card.Link = CardLink;

export default Card;
