import { getTimeAgo } from "@/lib/utils";
import { Avatar } from "@/components/ui";
import ICLike from "@/assets/icons/ic-heart.svg";

type CardInfoProps = {
  image?: string | null;
  writer: string;
  createdAt: string;
  likeCount: number;
};

export default function CardInfo({ image, writer, createdAt, likeCount }: CardInfoProps) {
  return (
    <div>
      <div>
        <div>
          <Avatar image={image} />
          <span>{writer}</span>
        </div>
        <span>{getTimeAgo(createdAt)}</span>
      </div>
      <div>
        <span>
          <ICLike />
        </span>
        {likeCount > 9999 ? "9999+" : likeCount}
      </div>
    </div>
  );
}
