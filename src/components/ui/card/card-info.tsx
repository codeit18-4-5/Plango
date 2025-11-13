import cn from "@/lib/cn";
import { getTimeAgo } from "@/lib/utils";
import { Avatar } from "@/components/ui";
import { CARD_INFO_STYLES } from "./index.styles";
import ICLike from "@/assets/icons/ic-heart.svg";

type CardInfoProps = {
  image?: string | null;
  writer: string;
  createdAt: string;
  likeCount?: number;
  className?: string;
  variant?: "primary" | "secondary";
};

export default function CardInfo({
  image,
  writer,
  createdAt,
  likeCount,
  className,
  variant = "primary",
}: CardInfoProps) {
  return (
    <div className={cn(CARD_INFO_STYLES.wrapper({ variant }), className)}>
      <div className={CARD_INFO_STYLES.meta.wrapper({ variant })}>
        <div className={CARD_INFO_STYLES.meta.writer({ variant })}>
          <Avatar image={image} className={CARD_INFO_STYLES.meta.avatar} />
          <span className={CARD_INFO_STYLES.meta.nickname}>{writer}</span>
        </div>
        <span className={CARD_INFO_STYLES.meta.time({ variant })}>{getTimeAgo(createdAt)}</span>
      </div>
      {likeCount !== undefined && (
        <div className={CARD_INFO_STYLES.like.wrapper}>
          <span className={CARD_INFO_STYLES.like.icon}>
            <ICLike />
          </span>
          {likeCount > 9999 ? "9999+" : likeCount}
        </div>
      )}
    </div>
  );
}
