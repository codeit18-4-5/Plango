import axiosInstance from "@/lib/axios";
import { ArticleListResponse, GetArticlesParams } from "@/types/article";

const getArticles = async (params?: GetArticlesParams): Promise<ArticleListResponse> => {
  const res = await axiosInstance.get("/articles", { params });
  return res.data;
};
export default getArticles;
