"use client";

import { useParams } from "next/navigation";
import { Container } from "@/components/layout";
import { Floating, ScrollTopButton } from "@/components/ui";
import { ArticleDetailInfo, ArticleCommentSection } from "@/components/features/article";
import {
  ARTICLE_COMMON_STYLES,
  ARTICLE_DETAIL_STYLES,
} from "@/components/features/article/index.styles";

export default function ArticleDetailPage() {
  const params = useParams();
  const articleId = Number(params.articleId);

  return (
    <Container as="main" className={ARTICLE_COMMON_STYLES.main.wrapper}>
      <h2 className="visually-hidden">자유게시판</h2>
      <div className={ARTICLE_DETAIL_STYLES.wrapper}>
        <ArticleDetailInfo articleId={articleId} />
        <ArticleCommentSection />
      </div>
      <Floating className="z-20">
        <ScrollTopButton />
      </Floating>
    </Container>
  );
}
