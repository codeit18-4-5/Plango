import cn from "@/lib/cn";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  CARD_WRAPPER_STYLES,
  CARD_CONTENT_STYLES,
  CARD_INFO_STYLES,
} from "@/components/ui/card/index.styles";

type CardSkeletonProps = {
  badge?: boolean;
  className?: string;
  variant?: "primary" | "secondary";
};

export default function CardSkeleton({
  badge = false,
  variant = "primary",
  className,
}: CardSkeletonProps) {
  return (
    <div className={cn(CARD_WRAPPER_STYLES.wrapper(false), "hover:border-gray-700", className)}>
      <div className={CARD_WRAPPER_STYLES.group}>
        {badge && <Skeleton height={22} width={48} />}
        <div className="flex w-full justify-between">
          <div className="w-[calc(100%-64px)] tablet:w-[calc(100%-72px)]">
            <Skeleton height={16} width={"70%"} />
            <Skeleton height={16} width={"62%"} style={{ marginTop: 8 }} />
          </div>
          <Skeleton
            height={64}
            width={64}
            borderRadius={8}
            className={cn(
              CARD_CONTENT_STYLES.image.wrapper,
              "border-0 align-top",
              "tablet:!h-[72px] tablet:!w-[72px]",
            )}
          />
        </div>
        <div className={cn(CARD_INFO_STYLES.wrapper({ variant }), "grid-cols-[auto_auto]")}>
          <div
            className={cn(
              CARD_INFO_STYLES.meta.wrapper({ variant }),
              "flex flex-col-reverse gap-y-[8px]",
              variant === "primary" ? "gap-x-[10px] tablet:grid" : "tablet:gap-y-[17px]",
            )}
          >
            <Skeleton
              circle={true}
              height={32}
              width={32}
              className={CARD_INFO_STYLES.meta.writer({ variant })}
            />
            <Skeleton
              height={14}
              width={72}
              className={cn(CARD_INFO_STYLES.meta.time({ variant }), "m-0 tablet:m-0")}
            />
          </div>
          <Skeleton height={14} width={30} />
        </div>
      </div>
    </div>
  );
}
