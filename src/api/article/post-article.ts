import axiosInstance from "@/lib/axios";
import { CreateArticleData } from "@/types/article";

const postArticle = async (articleData: CreateArticleData) => {
  const res = await axiosInstance.post("/articles", articleData);
  return res;
};
export default postArticle;
