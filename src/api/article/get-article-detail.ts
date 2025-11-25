import axiosInstance from "@/lib/axios";
import { ArticleDetail } from "@/types/article";

const getArticleDetail = async ({ articleId }: { articleId: number }): Promise<ArticleDetail> => {
  const res = await axiosInstance.get(`/articles/${articleId}`);
  console.log(res.data);
  return res.data;
};

export default getArticleDetail;
