"use client";
import { useEffect, useState } from "react";
import getArticles from "@/api/article/get-articles";
import { Container } from "@/components/layout";
import {
  ArticleSearchBar,
  BestArticlesSection,
  ArticleListSection,
} from "@/components/features/article/article-list";
import { ARTICLE_STYLES } from "@/components/features/article/article.styles";
import { Article } from "@/types/article";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    getArticles({ page: 1, pageSize: 10, orderBy: "recent" }).then(res => {
      setArticles(res.list);
    });
  }, []);

  return (
    <Container as="main" className={ARTICLE_STYLES.main.wrapper}>
      <h2 className={ARTICLE_STYLES.main.title}>자유게시판</h2>
      <ArticleSearchBar />
      <BestArticlesSection />
      <ArticleListSection
        articles={articles}
        options={[
          { label: "최신순", value: "recent" },
          { label: "좋아요순", value: "like" },
        ]}
      />
    </Container>
  );
}
