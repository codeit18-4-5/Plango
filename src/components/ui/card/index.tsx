import { ReactNode } from "react";
import cn from "@/lib/cn";
import CardBadge from "./card-badge";
import CardContent from "./card-content";
import CardInfo from "./card-info";

type CardProps = {
  id: number;
  children: ReactNode;
  className?: string;
};

function Card({ id, children, className }: CardProps) {
  return (
    <div key={id} className={cn("relative", className)}>
      {children}
    </div>
  );
}

Card.Badge = CardBadge;
Card.Content = CardContent;
Card.Info = CardInfo;

export default Card;
