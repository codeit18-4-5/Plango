"use client";
import cn from "@/lib/cn";
import { formatSocialCount } from "@/lib/utils";
import { Button } from "@/components/ui";
import IcLiked from "@/assets/icons/ic-heart-color.svg";

type LikeButtonProps = {
  liked: boolean;
  likeCount: number;
  className?: string;
  onClick?: () => void;
};

export default function LikeButton({
  liked,
  likeCount,
  className,
  onClick,
  ...props
}: LikeButtonProps) {
  return (
    <div>
      <Button
        size="icon"
        type="button"
        className={cn(
          "hover:text-pink-400",
          className,
          liked ? "like-effect text-pink-500" : "like-effect text-gray-400",
        )}
        aria-label={liked ? "좋아요 취소" : "좋아요"}
        onClick={onClick}
        {...props}
      >
        <IcLiked />
      </Button>
      <span>{formatSocialCount(likeCount)}</span>
    </div>
  );
}
