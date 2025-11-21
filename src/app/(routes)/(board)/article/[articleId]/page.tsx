"use client";

import { Container } from "@/components/layout";
import { Floating, ScrollTopButton } from "@/components/ui";
import { ArticleDetailInfo, ArticleCommentSection } from "@/components/features/article";
import { ARTICLE_COMMON_STYLES } from "@/components/features/article/index.styles";

export default function ArticleDetailPage() {
  return (
    <Container as="main" className={ARTICLE_COMMON_STYLES.main.wrapper}>
      <h2 className="visually-hidden">자유게시판</h2>
      <div>
        <h3 className="visually-hidden">게시글 상세 정보</h3>
        <ArticleDetailInfo />
        <ArticleCommentSection />
      </div>
      <Floating className="z-20">
        <ScrollTopButton />
      </Floating>
    </Container>
  );
}
