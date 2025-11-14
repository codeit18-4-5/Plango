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
};

export default function CardSkeleton({ badge = false }: CardSkeletonProps) {
  return (
    <div className={CARD_WRAPPER_STYLES.wrapper(false)}>
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
        <div
          className={cn(CARD_INFO_STYLES.wrapper({ variant: "primary" }), "grid-cols-[auto_auto]")}
        >
          <div
            className={cn(
              "flex flex-row-reverse flex-col-reverse flex-wrap gap-[8px]",
              "tablet:flex-row tablet:items-center",
            )}
          >
            <Skeleton circle={true} height={32} width={32} className="align-top" />
            <Skeleton height={14} width={72} />
          </div>
          <Skeleton height={14} width={30} />
        </div>
      </div>
    </div>
  );
}
