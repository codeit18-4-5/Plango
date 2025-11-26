import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import getArticleDetail from "@/api/article/get-article-detail";
import { notFound } from "next/navigation";
import { AxiosError } from "axios";
import { Container } from "@/components/layout";
import { Floating, ScrollTopButton } from "@/components/ui";
import { ArticleDetailInfo, ArticleCommentSection } from "@/components/features/article";
import {
  ARTICLE_COMMON_STYLES,
  ARTICLE_DETAIL_STYLES,
} from "@/components/features/article/index.styles";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;
  const articleIdNum = Number(articleId);
  const queryClient = new QueryClient();

  const article = await getArticleDetail({ articleId: articleIdNum }).catch(e => {
    if (e instanceof AxiosError && e.response?.status === 404) notFound();
    throw e;
  });
  if (!article || !article.id) notFound();
  queryClient.setQueryData(["getArticleDetail", articleIdNum], article);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container as="main" className={ARTICLE_COMMON_STYLES.main.wrapper}>
        <h2 className="visually-hidden">자유게시판</h2>
        <div className={ARTICLE_DETAIL_STYLES.wrapper}>
          <ArticleDetailInfo article={article} />
          <ArticleCommentSection articleId={articleIdNum} />
        </div>
        <Floating className="z-20">
          <ScrollTopButton />
        </Floating>
      </Container>
    </HydrationBoundary>
  );
}
