import { ArticleDetail } from "@/types/article";
import { serverFetch } from "@/lib/server/server-fetch";

const getArticleDetailSSR = async ({
  articleId,
}: {
  articleId: number;
}): Promise<ArticleDetail> => {
  const res = await serverFetch<ArticleDetail>(`/articles/${articleId}`);
  return res;
};

export default getArticleDetailSSR;
