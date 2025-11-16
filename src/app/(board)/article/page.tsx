"use client";

import { Container } from "@/components/layout";
import { SearchBar, BestArticleSection, AllArticleSection } from "@/components/features/article";
import { Floating, ScrollTopButton, CircleButton } from "@/components/ui";
import { ARTICLE_COMMON_STYLES } from "@/components/features/article/index.styles";
import IcEdit from "@/assets/icons/ic-pencil.svg";

export default function ArticlesPage() {
  return (
    <Container as="main" className={ARTICLE_COMMON_STYLES.main.wrapper}>
      <h2 className={ARTICLE_COMMON_STYLES.main.title}>자유게시판</h2>
      <SearchBar />
      <BestArticleSection />
      <AllArticleSection />
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
