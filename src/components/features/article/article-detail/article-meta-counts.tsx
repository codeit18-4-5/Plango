"use client";

import { useQuery } from "@tanstack/react-query";
import getArticleDetail from "@/api/article/get-article-detail";
import { clampText } from "@/lib/utils";
import { DISPLAY_LIMITS } from "@/constants/display";
import { ARTICLE_DETAIL_STYLES } from "../index.styles";
import IcComment from "@/assets/icons/ic-comment.svg";
import IcHeart from "@/assets/icons/ic-heart.svg";

type ArticleMetaCountsProps = {
  articleId: number;
  initialLikeCount: number;
  initialCommentCount: number;
};

export default function ArticleMetaCounts({
  articleId,
  initialLikeCount,
  initialCommentCount,
}: ArticleMetaCountsProps) {
  const { data } = useQuery<{ likeCount: number; commentCount: number }, Error>({
    queryKey: ["getArticleDetail", articleId],
    queryFn: () => getArticleDetail({ articleId }),
    select: data => ({ likeCount: data.likeCount, commentCount: data.commentCount }),
    placeholderData: { likeCount: initialLikeCount, commentCount: initialCommentCount },
  });

  return (
    <>
      <span>
        <IcComment className={ARTICLE_DETAIL_STYLES.meta.icon} />
        <span className="visually-hidden">댓글</span>
        {clampText(data!.commentCount, DISPLAY_LIMITS.MAX_COMMENT_COUNT)}
      </span>
      <span>
        <IcHeart className={ARTICLE_DETAIL_STYLES.meta.icon} />
        <span className="visually-hidden">좋아요</span>
        {clampText(data!.likeCount, DISPLAY_LIMITS.MAX_LIKE_COUNT)}
      </span>
    </>
  );
}
