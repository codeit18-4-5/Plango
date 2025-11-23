"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import getArticles from "@/api/article/get-articles";
import { useResponsive } from "@/hooks/use-responsive";
import { Card } from "@/components/ui";
import CardSkeleton from "@/components/skeleton-ui/card-skeleton";
import { ArticleListEmpty } from "@/components/features/article";
import { Article } from "@/types/article";
import { ListSectionHeader, ListSectionContent } from "../layout";
import { ARTICLE_COMMON_STYLES, ARTICLE_LIST_STYLES } from "../index.styles";

export default function BestArticleSection() {
  const { isMobile, isTablet } = useResponsive();
  const [mounted, setMounted] = useState(false);

  const { data: articles = [], isPending } = useQuery<Article[], Error>({
    queryKey: ["getArticles"],
    queryFn: () => getArticles({ page: 1, pageSize: 3, orderBy: "like" }).then(res => res.list),
    staleTime: 300000,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const showCount = (() => {
    if (!mounted) return 3;
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  })();

  return (
    <section className={ARTICLE_LIST_STYLES.section.wrapper}>
      <ListSectionHeader title="베스트 게시글" />
      <ListSectionContent gridType={!isPending && articles.length === 0 ? "none" : "best"}>
        {isPending &&
          Array.from({ length: showCount }).map((_, i) => (
            <CardSkeleton
              key={i}
              badge
              className={i === 1 ? "mobile:hidden desktop:block" : ""}
              variant="secondary"
            />
          ))}
        {!isPending && articles.length === 0 && <ArticleListEmpty />}
        {!isPending &&
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
                variant="secondary"
              />
            </Card>
          ))}
      </ListSectionContent>
    </section>
  );
}
