"use client";

import { Container } from "@/components/layout";
import {
  ArticleSearchBar,
  BestArticlesSection,
  ArticleListSection,
} from "@/components/features/article/article-list";
import { ARTICLE_STYLES } from "@/components/features/article/article.styles";

export default function ArticlesPage() {
  return (
    <Container as="main" className={ARTICLE_STYLES.main.wrapper}>
      <h2 className={ARTICLE_STYLES.main.title}>자유게시판</h2>
      <ArticleSearchBar />
      <BestArticlesSection />
      <ArticleListSection
        options={[
          { label: "최신순", value: "recent" },
          { label: "좋아요순", value: "like" },
        ]}
      />
    </Container>
  );
}
