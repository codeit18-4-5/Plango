import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import getArticleDetail from "@/api/article/get-article-detail";
import ArticleEditForm from "@/components/features/article/article-form/article-edit-form";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;
  const articleIdNum = Number(articleId);

  const queryClient = new QueryClient();
  const article = await getArticleDetail({ articleId: articleIdNum });
  queryClient.setQueryData(["article-edit", articleIdNum], article);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArticleEditForm articleId={articleIdNum} />
    </HydrationBoundary>
  );
}
