import { useQuery, UseQueryResult } from "@tanstack/react-query";
import getArticleDetail from "@/api/article/get-article-detail";
import { ArticleDetail } from "@/types/article";
import { useAuthStore } from "@/store/auth.store";

export default function useArticleDetail(
  articleId: number,
  initialData?: ArticleDetail,
): UseQueryResult<ArticleDetail, Error> {
  const user = useAuthStore(state => state.user);
  return useQuery<ArticleDetail, Error>({
    queryKey: ["getArticleDetail", articleId, user?.id],
    queryFn: () => getArticleDetail({ articleId }),
    initialData,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}
