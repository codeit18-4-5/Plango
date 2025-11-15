"use client";
import { useEffect, useState } from "react";
import getArticles from "@/api/article/get-articles";
import { Container } from "@/components/layout";
import { Floating, ScrollTopButton, CircleButton } from "@/components/ui";
import {
  ArticleSearchBar,
  BestArticlesSection,
  ArticleListSection,
} from "@/components/features/article/article-list";
import { ARTICLE_STYLES } from "@/components/features/article/article.styles";
import { Article } from "@/types/article";
import IcEdit from "@/assets/icons/ic-pencil.svg";

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
      <Floating>
        <ScrollTopButton />
        <CircleButton as="a" href="/article/write">
          <IcEdit className="h-6 w-6" />
          <span className="visually-hidden">글쓰기</span>
        </CircleButton>
      </Floating>
    </Container>
  );
}
