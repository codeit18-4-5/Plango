"use client";
import cn from "@/lib/cn";
import { Button } from "@/components/ui";
import IcLiked from "@/assets/icons/ic-heart-color.svg";

type LikeButtonProps = {
  liked: boolean;
  className?: string;
  onClick?: () => void;
};

export default function LikeButton({ liked, className, onClick, ...props }: LikeButtonProps) {
  return (
    <Button
      size="icon"
      type="button"
      className={cn(className, liked ? "like-effect text-pink-500" : "like-effect text-gray-400")}
      aria-label={liked ? "좋아요 취소" : "좋아요"}
      onClick={onClick}
      {...props}
    >
      <IcLiked />
    </Button>
  );
}
