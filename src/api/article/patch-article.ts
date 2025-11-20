import axiosInstance from "@/lib/axios";
import { CreateArticleData } from "@/types/article";

const patchArticle = async (articleId: number, data: CreateArticleData) => {
  const res = await axiosInstance.patch(`/articles/${articleId}`, data);
  return res;
};
export default patchArticle;
