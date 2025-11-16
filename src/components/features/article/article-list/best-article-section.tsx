import { useState, useEffect } from "react";
import getArticles from "@/api/article/get-articles";
import { useResponsive } from "@/hooks/use-responsive";
import { Card } from "@/components/ui";
import CardSkeleton from "@/components/skeleton-ui/card-skeleton";
import { Article } from "@/types/article";
import { ListSectionHeader, ListSectionContent } from "../layout";
import { ARTICLE_COMMON_STYLES, ARTICLE_LIST_STYLES } from "../index.styles";
import { ArticleListEmpty } from "@/components/features/article";

export default function BestArticleSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    setIsLoading(true);
    getArticles({ page: 1, pageSize: 3, orderBy: "like" }).then(res => {
      setArticles(res.list);
      setIsLoading(false);
    });
  }, []);

  const showCount = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <section className={ARTICLE_LIST_STYLES.section.wrapper}>
      <ListSectionHeader title="베스트 게시글" />
      <ListSectionContent gridType="best">
        {isLoading &&
          Array.from({ length: showCount }).map((_, i) => (
            <CardSkeleton key={i} badge className={i === 1 ? "mobile:hidden desktop:block" : ""} />
          ))}
        {!isLoading && articles.length === 0 && <ArticleListEmpty />}
        {!isLoading &&
          articles.length > 0 &&
          articles.slice(0, showCount).map(article => (
            <Card id={article.id} href={`/article/${article.id}`} key={article.id}>
              <Card.Badge />
              <Card.Content
                title={article.title}
                image={article.image}
                className={ARTICLE_COMMON_STYLES.card.content}
              />
              <Card.Info
                writer={article.writer.nickname}
                createdAt={article.createdAt}
                likeCount={article.likeCount}
                image={article.writer.image}
              />
            </Card>
          ))}
      </ListSectionContent>
    </section>
  );
}
