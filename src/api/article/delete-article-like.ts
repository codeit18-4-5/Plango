import axiosInstance from "@/lib/axios";
import { ArticleDetail } from "@/types/article";

const deleteArticleLike = async (articleId: number): Promise<ArticleDetail> => {
  const res = await axiosInstance.delete(`/articles/${articleId}/like`);
  return res.data;
};

export default deleteArticleLike;
