import Image from "next/image";
import Link from "next/link";
import { getTimeAgo, formatDateToFullStr, parseArticleContent } from "@/lib/utils";
import { ArticleDetail } from "@/types/article";
import { Button } from "@/components/ui";
import ArticleMetaCounts from "@/components/features/article/article-detail/article-meta-counts";
import ArticleLike from "@/components/features/article/actions/article-like";
import KebabMenu from "@/components/features/article/actions/kebab-menu";
import CopyToken from "@/components/features/article/actions/copy-token";
import { ARTICLE_DETAIL_STYLES } from "../index.styles";

type ArticleDetailInfoProps = { article: ArticleDetail };

export default function ArticleDetailInfo({ article }: ArticleDetailInfoProps) {
  if (!article) return null;
  const DATE_TIME = article.createdAt;

  const parsedContent = parseArticleContent(article.content);

  return (
    <section>
      <h3 className="visually-hidden">게시글 상세 정보</h3>
      <div className={ARTICLE_DETAIL_STYLES.heading.wrapper}>
        <h4 className={ARTICLE_DETAIL_STYLES.heading.title}>{article.title}</h4>
        <KebabMenu article={article} className={ARTICLE_DETAIL_STYLES.heading.kebab} />
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
          <ArticleMetaCounts articleId={article.id} initialData={article} />
        </div>
      </div>
      <div className={ARTICLE_DETAIL_STYLES.content}>
        {parsedContent.token && (
          <>
            <CopyToken token={parsedContent.token} /> <br />
          </>
        )}

        {parsedContent.content}
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
        <ArticleLike
          articleId={article.id}
          initialData={article}
          className={ARTICLE_DETAIL_STYLES.actions.like}
        />
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
