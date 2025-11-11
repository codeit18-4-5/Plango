import cn from "@/lib/cn";
import { CARD_BADGE_STYLES } from "./index.styles";
import IcMedal from "@/assets/icons/ic-medal.svg";

type CardBadgeProps = {
  variant?: "best" | "new";
  className?: string;
  children?: React.ReactNode;
};

const badgeText = {
  best: "Best",
  new: "New",
};

export default function CardBadge({ variant = "best", className, children }: CardBadgeProps) {
  return (
    <div className={cn(CARD_BADGE_STYLES.wrapper, className)}>
      <span className={CARD_BADGE_STYLES.icon}>
        <IcMedal />
      </span>
      {children || badgeText[variant]}
    </div>
  );
}
