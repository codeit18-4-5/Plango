"use client";
import useArticleDetail from "@/hooks/article/use-article-detail";
import { clampText } from "@/lib/utils";
import { DISPLAY_LIMITS } from "@/constants/display";
import { ARTICLE_DETAIL_STYLES } from "../index.styles";
import IcComment from "@/assets/icons/ic-comment.svg";
import IcHeart from "@/assets/icons/ic-heart.svg";

import { ArticleDetail } from "@/types/article";
type ArticleMetaCountsProps = {
  articleId: number;
  initialData?: ArticleDetail;
};

export default function ArticleMetaCounts({ articleId, initialData }: ArticleMetaCountsProps) {
  const { data } = useArticleDetail(articleId, initialData);
  if (!data) return null;

  return (
    <>
      <span>
        <IcComment className={ARTICLE_DETAIL_STYLES.meta.icon} />
        <span className="visually-hidden">댓글</span>
        {clampText(data.commentCount, DISPLAY_LIMITS.MAX_COMMENT_COUNT)}
      </span>
      <span>
        <IcHeart className={ARTICLE_DETAIL_STYLES.meta.icon} />
        <span className="visually-hidden">좋아요</span>
        {clampText(data.likeCount, DISPLAY_LIMITS.MAX_LIKE_COUNT)}
      </span>
    </>
  );
}
