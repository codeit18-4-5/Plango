import axiosInstance from "@/lib/axios";
import { ArticleListResponse } from "@/types/article";

type GetArticlesParams = {
  page?: number;
  pageSize?: number;
  orderBy?: "recent" | "like";
  keyword?: string;
};

const getArticles = async (params?: GetArticlesParams): Promise<ArticleListResponse> => {
  const res = await axiosInstance.get("/articles", { params });
  return res.data;
};
export default getArticles;
