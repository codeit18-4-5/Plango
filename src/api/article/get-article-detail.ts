import axiosInstance from "@/lib/axios";
import { ArticleDetail } from "@/types/article";

const getArticleDetail = async (articleId: number): Promise<ArticleDetail> => {
  const res = await axiosInstance.get(`/articles/${articleId}`);
  return res.data;
};

export default getArticleDetail;
