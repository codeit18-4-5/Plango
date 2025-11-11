import cn from "@/lib/cn";

type CardBadgeProps = {
  variant?: "best" | "new";
  className?: string;
  children?: React.ReactNode;
};

const badgeText = {
  best: "BEST",
  new: "NEW",
};

export default function CardBadge({ variant = "best", className, children }: CardBadgeProps) {
  return <div className={cn(className)}>{children || badgeText[variant]}</div>;
}
