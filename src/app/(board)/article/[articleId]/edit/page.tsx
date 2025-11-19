import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import getArticleDetail from "@/api/article/get-article-detail";
import ArticleEditForm from "@/components/features/article/article-form/article-edit-form";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const queryClient = new QueryClient();

  const { articleId } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["article-edit", articleId],
    queryFn: () => getArticleDetail({ articleId: Number(articleId) }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArticleEditForm articleId={Number(articleId)} />
    </HydrationBoundary>
  );
}
