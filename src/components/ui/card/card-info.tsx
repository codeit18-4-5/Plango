import { getTimeAgo } from "@/lib/utils";
import { Avatar } from "@/components/ui";
import { CARD_INFO_STYLES } from "./index.styles";
import ICLike from "@/assets/icons/ic-heart.svg";

type CardInfoProps = {
  image?: string | null;
  writer: string;
  createdAt: string;
  likeCount: number;
};

export default function CardInfo({ image, writer, createdAt, likeCount }: CardInfoProps) {
  return (
    <div className={CARD_INFO_STYLES.wrapper}>
      <div className={CARD_INFO_STYLES.meta.wrapper}>
        <div className={CARD_INFO_STYLES.meta.writer}>
          <Avatar image={image} />
          <span className={CARD_INFO_STYLES.meta.nickname}>{writer}</span>
        </div>
        <span className={CARD_INFO_STYLES.meta.time}>{getTimeAgo(createdAt)}</span>
      </div>
      <div className={CARD_INFO_STYLES.like.wrapper}>
        <span className={CARD_INFO_STYLES.like.icon}>
          <ICLike />
        </span>
        {likeCount > 9999 ? "9999+" : likeCount}
      </div>
    </div>
  );
}
