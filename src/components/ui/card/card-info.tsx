import cn from "@/lib/cn";
import { getTimeAgo, formatDateToKorean, clampText } from "@/lib/utils";
import { DISPLAY_LIMITS } from "@/constants/display";
import { Avatar } from "@/components/ui";
import { CARD_INFO_STYLES } from "./index.styles";
import IcComment from "@/assets/icons/ic-comment.svg";
import IcLike from "@/assets/icons/ic-heart.svg";

type CardInfoProps = {
  image?: string | null;
  writer: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  className?: string;
  variant?: "primary" | "secondary";
};

export default function CardInfo({
  image,
  writer,
  createdAt,
  likeCount,
  commentCount,
  className,
  variant = "primary",
}: CardInfoProps) {
  return (
    <div className={cn(CARD_INFO_STYLES.wrapper({ variant }), className)}>
      <div className={CARD_INFO_STYLES.meta.wrapper({ variant })}>
        <div className={CARD_INFO_STYLES.meta.writer({ variant })}>
          <Avatar image={image} className={CARD_INFO_STYLES.meta.avatar} />
          <span className="visually-hidden">작성자</span>
          <span className={CARD_INFO_STYLES.meta.nickname}>{writer}</span>
        </div>
        <time
          dateTime={createdAt}
          title={formatDateToKorean(new Date(createdAt))}
          aria-label={formatDateToKorean(new Date(createdAt))}
          className={CARD_INFO_STYLES.meta.time({ variant })}
        >
          {getTimeAgo(createdAt)}
        </time>
      </div>
      <div className={CARD_INFO_STYLES.stats.wrapper}>
        <span>
          <IcComment className={CARD_INFO_STYLES.stats.icon} />
          <span className="visually-hidden">댓글</span>
          {clampText(commentCount, DISPLAY_LIMITS.MAX_COMMENT_COUNT)}
        </span>
        <span>
          <IcLike className={CARD_INFO_STYLES.stats.icon} />
          <span className="visually-hidden">좋아요</span>
          {clampText(likeCount, DISPLAY_LIMITS.MAX_LIKE_COUNT)}
        </span>
      </div>
    </div>
  );
}
