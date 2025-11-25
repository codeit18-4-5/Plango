"use client";

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import getArticleDetail from "@/api/article/get-article-detail";
import deleteArticle from "@/api/article/delete-article";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import { getTimeAgo, formatDateToFullStr, clampText, formatSocialCount } from "@/lib/utils";
import { DISPLAY_LIMITS } from "@/constants/display";
import { Button } from "@/components/ui";
import KebabMenu from "@/components/features/article/actions/kebab-menu";
import { ARTICLE_DETAIL_STYLES } from "../index.styles";
import IcComment from "@/assets/icons/ic-comment.svg";
import IcHeart from "@/assets/icons/ic-heart.svg";

export default function ArticleDetailInfo({ articleId }: { articleId: number }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const currentUser = useAuthStore(state => state.user);

  const { data: article, isError } = useQuery({
    queryKey: ["getArticleDetail", articleId],
    queryFn: () => getArticleDetail({ articleId }),
    enabled: !!articleId,
  });

  const { mutate: deleteArticleMutate } = useMutation({
    mutationFn: () => deleteArticle({ articleId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getArticleDetail", articleId] });
      queryClient.invalidateQueries({ queryKey: ["getArticles"] });
      router.replace("/article");
    },
  });

  if (isError || !article) return null;

  const DATE_TIME = article.createdAt;

  return (
    <section>
      <h3 className="visually-hidden">게시글 상세 정보</h3>
      <div className={ARTICLE_DETAIL_STYLES.heading.wrapper}>
        <h4 className={ARTICLE_DETAIL_STYLES.heading.title}>{article.title}</h4>
        {currentUser?.id === article.writer.id && (
          <KebabMenu
            className={ARTICLE_DETAIL_STYLES.heading.kebab}
            options={[
              {
                label: "수정하기",
                as: Link,
                href: `/article/${article.id}/edit`,
              },
              {
                label: "삭제하기",
                onClick: () => deleteArticleMutate(),
              },
            ]}
          />
        )}
      </div>
      <div className={ARTICLE_DETAIL_STYLES.meta.wrapper}>
        <div className={ARTICLE_DETAIL_STYLES.meta.authorInfo}>
          <span className="visually-hidden">작성자</span>
          <span>{article.writer.nickname}</span>
          <time
            dateTime={DATE_TIME}
            title={formatDateToFullStr({ date: DATE_TIME })}
            aria-label={formatDateToFullStr({ date: DATE_TIME })}
            className={ARTICLE_DETAIL_STYLES.meta.timeStamp}
          >
            {getTimeAgo(DATE_TIME)}
          </time>
        </div>
        <div className={ARTICLE_DETAIL_STYLES.meta.stats}>
          <span>
            <IcComment className={ARTICLE_DETAIL_STYLES.meta.icon} />
            <span className="visually-hidden">댓글</span>
            {clampText(article.commentCount, DISPLAY_LIMITS.MAX_COMMENT_COUNT)}
          </span>
          <span>
            <IcHeart className={ARTICLE_DETAIL_STYLES.meta.icon} />
            <span className="visually-hidden">좋아요</span>
            {clampText(article.likeCount, DISPLAY_LIMITS.MAX_LIKE_COUNT)}
          </span>
        </div>
      </div>
      <div className={ARTICLE_DETAIL_STYLES.content}>
        {article.content}
        {article.image && (
          <span className="relative mt-4 block max-w-[80%]">
            <Image
              src={article.image}
              alt="게시글 첨부 이미지"
              width={600}
              height={600}
              draggable={false}
              priority
            />
          </span>
        )}
      </div>
      <div className={ARTICLE_DETAIL_STYLES.actions.wrapper}>
        <div className={ARTICLE_DETAIL_STYLES.actions.like}>
          <span>{formatSocialCount(article.likeCount)}</span>
        </div>
        <Button
          as={Link}
          href="/article"
          size="sm"
          intent="tertiary"
          className={ARTICLE_DETAIL_STYLES.actions.backToList}
        >
          목록으로
        </Button>
      </div>
    </section>
  );
}
