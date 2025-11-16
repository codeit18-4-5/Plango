"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import getArticles from "@/api/article/get-articles";
import { Container } from "@/components/layout";
import { Floating, ScrollTopButton, CircleButton } from "@/components/ui";
import {
  ArticleSearchBar,
  BestArticlesSection,
  ArticleListSection,
} from "@/components/features/article/article-list";
import { Article, ArticleOrderType, ArticleSortOption } from "@/types/article";
import { ARTICLE_STYLES } from "@/components/features/article/article.styles";
import IcEdit from "@/assets/icons/ic-pencil.svg";

const sortOptions: ArticleSortOption[] = [
  { label: "최신순", value: "recent" },
  { label: "좋아요순", value: "like" },
];

export default function ArticlesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderBy = (searchParams.get("orderBy") as ArticleOrderType) || "recent";

  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    getArticles({ page: 1, pageSize: 6, orderBy }).then(res => setArticles(res.list));
  }, [orderBy]);

  const setQueryParams = (newOrderBy: ArticleOrderType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.set("orderBy", newOrderBy);
    router.push(`?${params.toString()}`);
  };

  const selectedSort = sortOptions.find(opt => opt.value === orderBy) ?? sortOptions[0];

  const onSortChange = (option: ArticleSortOption) => {
    setQueryParams(option.value);
  };

  return (
    <Container as="main" className={ARTICLE_STYLES.main.wrapper}>
      <h2 className={ARTICLE_STYLES.main.title}>자유게시판</h2>
      <ArticleSearchBar />
      <BestArticlesSection />
      <ArticleListSection
        articles={articles}
        options={sortOptions}
        selected={selectedSort}
        onChange={onSortChange}
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
