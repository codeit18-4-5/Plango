import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import getArticleDetail from "@/api/article/get-article-detail";
import deleteArticle from "@/api/article/delete-article";
import Image from "next/image";
import Link from "next/link";
import { getTimeAgo, formatDateToKorean } from "@/lib/utils";
import { DISPLAY_LIMITS } from "@/constants/display";
import { Dropdown, Button } from "@/components/ui";
import { ARTICLE_DETAIL_STYLES } from "../index.styles";
import IcKebab from "@/assets/icons/ic-kebab.svg";
import IcComment from "@/assets/icons/ic-comment.svg";
import IcHeart from "@/assets/icons/ic-heart.svg";
import IcLiked from "@/assets/icons/ic-heart-color.svg";

export default function ArticleDetailInfo({ articleId }: { articleId: number }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: article } = useQuery({
    queryKey: ["getArticleDetail", articleId],
    queryFn: () => getArticleDetail({ articleId }),
    enabled: !!articleId,
  });

  const { mutate: deleteArticleMutate } = useMutation({
    mutationFn: () => deleteArticle({ articleId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getArticleDetail", articleId] });
      queryClient.invalidateQueries({ queryKey: ["getArticles"] });
      router.push("/articles");
    },
  });

  if (!article) {
    return <section>게시글 불러오는 중...</section>;
  }

  const DATE_TIME = article.createdAt;

  return (
    <section>
      <h3 className="visually-hidden">게시글 상세 정보</h3>
      <div className={ARTICLE_DETAIL_STYLES.heading.wrapper}>
        <h4 className={ARTICLE_DETAIL_STYLES.heading.title}>{article.title}</h4>
        <Dropdown className={ARTICLE_DETAIL_STYLES.heading.kebab}>
          <Dropdown.TriggerIcon
            intent="icon"
            className="duration-200 hover:text-gray-400 focus:text-gray-200 active:text-gray-300"
            aria-label="옵션 더보기"
          >
            <IcKebab />
          </Dropdown.TriggerIcon>
          <Dropdown.Menu size="md">
            <Dropdown.Option align="center" as={Link} href={`/article/${article.id}/edit`}>
              수정하기
            </Dropdown.Option>
            <Dropdown.Option align="center" onClick={() => deleteArticleMutate()}>
              삭제하기
            </Dropdown.Option>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className={ARTICLE_DETAIL_STYLES.meta.wrapper}>
        <div className={ARTICLE_DETAIL_STYLES.meta.authorInfo}>
          <span className="visually-hidden">작성자</span>
          <span>{article.writer.nickname}</span>
          <time
            dateTime={DATE_TIME}
            title={formatDateToKorean(new Date(DATE_TIME))}
            aria-label={formatDateToKorean(new Date(DATE_TIME))}
            className={ARTICLE_DETAIL_STYLES.meta.timeStamp}
          >
            {getTimeAgo(DATE_TIME)}
          </time>
        </div>
        <div className={ARTICLE_DETAIL_STYLES.meta.stats}>
          <span>
            <IcComment className={ARTICLE_DETAIL_STYLES.meta.icon} />
            <span className="visually-hidden">댓글</span>
            {article.commentCount > DISPLAY_LIMITS.MAX_COMMENT_COUNT
              ? DISPLAY_LIMITS.MAX_COMMENT_COUNT_TEXT
              : article.commentCount}
          </span>
          <span>
            <IcHeart className={ARTICLE_DETAIL_STYLES.meta.icon} />
            <span className="visually-hidden">좋아요</span>
            {article.likeCount > DISPLAY_LIMITS.MAX_LIKE_COUNT
              ? DISPLAY_LIMITS.MAX_LIKE_COUNT_TEXT
              : article.likeCount}
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
          <Button
            size="icon"
            className="hover:text-pink-400"
            aria-label={article.isLiked ? "좋아요 취소" : "좋아요"}
          >
            <IcLiked />
          </Button>
          <span>
            {article.likeCount > DISPLAY_LIMITS.MAX_LIKE_COUNT
              ? DISPLAY_LIMITS.MAX_LIKE_COUNT_TEXT
              : article.likeCount}
          </span>
        </div>
        <Button
          as="a"
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
