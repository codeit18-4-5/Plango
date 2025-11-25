import axiosInstance from "@/lib/axios";
import { ArticleDetail } from "@/types/article";

const postArticleLike = async (articleId: number): Promise<ArticleDetail> => {
  const res = await axiosInstance.post(`/articles/${articleId}/like`);
  return res.data;
};

export default postArticleLike;
