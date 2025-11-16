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

type ArticleOrderType = "recent" | "like";

type ArticleSortOption = {
  label: string;
  value: ArticleOrderType;
};

const sortOptions: ArticleSortOption[] = [
  { label: "최신순", value: "recent" },
  { label: "좋아요순", value: "like" },
];

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedSort, setSelectedSort] = useState<ArticleSortOption>(sortOptions[0]);

  useEffect(() => {
    getArticles({
      page: 1,
      pageSize: 6,
      orderBy: selectedSort.value,
    }).then(res => setArticles(res.list));
  }, [selectedSort.value]);

  return (
    <Container as="main" className={ARTICLE_STYLES.main.wrapper}>
      <h2 className={ARTICLE_STYLES.main.title}>자유게시판</h2>
      <ArticleSearchBar />
      <BestArticlesSection />
      <ArticleListSection
        articles={articles}
        options={sortOptions}
        selected={selectedSort}
        onChange={setSelectedSort}
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
