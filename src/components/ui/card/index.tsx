import { ReactNode } from "react";
import cn from "@/lib/cn";
import CardBadge from "./card-badge";
import CardContent from "./card-content";
import CardInfo from "./card-info";
import { CARD_WRAPPER_STYLES } from "./index.styles";

type CardProps = {
  id: number;
  href: string;
  children: ReactNode;
  className?: string;
};

function Card({ id, href, children, className }: CardProps) {
  return (
    <div key={id} className={cn(CARD_WRAPPER_STYLES.wrapper, className)}>
      <a href={href} className={CARD_WRAPPER_STYLES.inner}>
        {children}
      </a>
    </div>
  );
}

Card.Badge = CardBadge;
Card.Content = CardContent;
Card.Info = CardInfo;

export default Card;
