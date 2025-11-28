"use client";
import cn from "@/lib/cn";
import { formatSocialCount } from "@/lib/utils";
import { Button } from "@/components/ui";
import IcLiked from "@/assets/icons/ic-heart-color.svg";

type LikeButtonProps = {
  liked?: boolean;
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
    <div className={cn(className, liked ? "text-gray-100" : "text-gray-400")}>
      <Button
        size="icon"
        type="button"
        className={cn(
          "text-inherit",
          liked ? "like-effect text-pink-500 hover:text-pink-600" : "hover:text-gray-500",
        )}
        aria-label={liked ? "좋아요 취소" : "좋아요"}
        onClick={onClick}
        {...props}
      >
        <IcLiked />
      </Button>
      {formatSocialCount(likeCount)}
    </div>
  );
}
